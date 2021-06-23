const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs= await Blog.find({})
    response.json(blogs);
})


blogsRouter.delete('/:id', async (request, response) => {
  const id= request.params.id;
  const blogs= await Blog.findByIdAndRemove(id)
  response.status(204).end();
})
  
  blogsRouter.post('/', async (request, response) => {
    if (!request.body.url && !request.body.title ) {
      return response.status(400).json({
        error: "content missing",
      });
    }
    const blog = new Blog(request.body)
    const result=await blog.save();
    response.status(201).json(result)
  })
  module.exports=blogsRouter;