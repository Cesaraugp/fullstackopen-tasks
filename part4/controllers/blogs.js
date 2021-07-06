const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const user = request.user;

  const blog = await Blog.findById(id);
  if (blog.user.toString() === user.id.toString()) {
    const blogs = await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    return response.status(403).json({
      error: "You must be the creator of this blog in order to delete it",
    });
  }
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;

  if (!request.body.url && !request.body.title) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  request.body.user = user._id;
  console.log(user._id, request.body);

  const blog = new Blog(request.body);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

/**
 *
 */

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
