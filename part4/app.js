const express=require('express');
require('express-async-errors')

const app= express();
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config');
const logger= require('./utils/logger');
const mongoUrl = config.MONGODB_URI;
const blogsRouter= require('./controllers/blogs')
const usersRouter= require('./controllers/users')
<<<<<<< HEAD
=======
const middleware= require('./utils/middleware')
>>>>>>> 17094f658297700c358ac86cee76ab2261f99f5e

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(resp=>{
    logger.info('The connection has been succesfuly made');
}).catch(error=>{
    logger.error('There was an error connecting with mongoDB',error);
})
app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
<<<<<<< HEAD
app.use('/api/users',usersRouter)
=======
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

>>>>>>> 17094f658297700c358ac86cee76ab2261f99f5e


module.exports=app;