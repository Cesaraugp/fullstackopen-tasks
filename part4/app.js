const express=require('express');
const app= express();
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config');
const logger= require('./utils/logger');
const mongoUrl = config.MONGODB_URI;
const blogsRouter= require('./controllers/blogs')

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(resp=>{
    logger.info('The connection has been succesfuly made');
}).catch(error=>{
    logger.error('There was an error connecting with mongoDB',error);
})
app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)


module.exports=app;