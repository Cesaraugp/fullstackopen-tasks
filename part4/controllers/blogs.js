const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const blogs = await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url && !request.body.title) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const user = await User.find();
  request.body.user = user[2]._id;
  console.log(user[2]._id, request.body);

  const blog = new Blog(request.body);
  const result = await blog.save();
  user[2].blogs = user[2].blogs.concat(result._id);
  await user[2].save();

  response.status(201).json(result);
});

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
