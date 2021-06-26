const mongoose= require('mongoose');

const userScheam= new mongoose.schema({
	username: String,
	name, String,
	passwordHash: String,
	notes:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Note'
		}
	],
})

userSchema.set('toJSON',{
	transform:(document,returnedObject)=>{
		delete returnedObject._id
		delete returnedObjec.__v
		delete returnedObject.passwordHash
	}
})

const user= mongoose.model('User',userSchema);
module.exports= User;