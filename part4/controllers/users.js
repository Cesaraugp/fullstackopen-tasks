const bcrypt= require('bcryptjs');
const usersRouter=require('express').Router();
const User= require('../models/users')


usersRouter.post('/',async(request,response)=>{
	const {body} = request
	const {username,name,password}= body;

	if(!password || password.length<3 || !username || username.length<3){
		return response.status(400).json({
			error:"Invalid username or password"
		})

	}
	const saltRounds= 10
	const passwordHash= await bcrypt.hash(body.password,saltRounds);
	const user= new User({
		username,
		name,
		passwordHash,
	})
    const savedUser= await user.save();
	response.json(savedUser);

})

usersRouter.get('/', async (request, response) => {
	const users = await User
	.find({})//.populate('notes', { content: 1, date: 1 })

	response.json(users)
})

module.exports=usersRouter;