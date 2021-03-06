let app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helper = require("./blogs_tests_helper");

api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsArray = helper.initialBlogsList.map((blog) => {
    let blogToSave = new Blog(blog);
    return blogToSave.save();
  });
  await Promise.all(blogsArray);
}, 15000);

describe("Blogs content", () => {
  test("Get the amount of blogs", async () => {
    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(helper.initialBlogsList.length);
  });
  test("Property name id", async () => {
    const response = await api.get("/api/blogs/");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("Testing addition/removal of blogs", () => {
  test("Create a new blog with token", async () => {
    const newBlog = {
      title: "Carnaval is everyday",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs/")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNlc2FycGVyZXoiLCJpZCI6IjYwZTM1M2E5MWYwZWJhMDJiZWMyNDIzNSIsImlhdCI6MTYyNTUxMjczNX0.bRXiP7hBW4YuVY8zYiO7uNNjOLqs3rq6ED3egD1_30A"
      )
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.getAllBlogs();
    expect(blogs).toHaveLength(helper.initialBlogsList.length + 1);
    const contents = blogs.map((r) => r.title);
    expect(contents).toContain("Carnaval is everyday");
  }, 7000);

  test("A blog with invalid token is not created", async () => {
    const newBlog = {
      title: "Carnaval is everyday",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs/")
      .set(
        "Authorization",
        "Bearer eyhhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNlc2FycGVyZXoiLCJpZCI6IjYwZTM1M2E5MWYwZWJhMDJiZWMyNDIzNSIsImlhdCI6MTYyNTUxMjczNX0.bRXiP7hBW4YuVY8zYiO7uNNjOLqs3rq6ED3egD1_30A"
      )
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.getAllBlogs();
    expect(blogs).toHaveLength(helper.initialBlogsList.length);
  }, 7000);

  test("Create a blog without likes defaults to 0", async () => {
    const newBlog = {
      title: "Carnaval is everyday",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post("/api/blogs/")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogs = await helper.getAllBlogs();
    const contents = blogs.filter((r) => r.title == "Carnaval is everyday");
    console.log(contents);
    expect(contents[0].likes).toEqual(0);
  }, 7000);

  test("A blog without title and url is not created", async () => {
    const newBlog = {
      likes: 3,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.getAllBlogs();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogsList.length);
  });

  test("delete a blog", async () => {
    const blogId = "5a422aa71b54a676234d17f8";
    await api.delete(`/api/blogs/${blogId}`).expect(204);

    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(helper.initialBlogsList.length - 1);
  }, 20000);

  test("update a blog likesAmount", async () => {
    const blogId = "5a422aa71b54a676234d17f8";
    const newLikesAmount = { likes: 3 };
    await api.put(`/api/blogs/${blogId}`).send(newLikesAmount);

    const response = await api.get("/api/blogs");
    const { body: blogs } = response;
    const contents = blogs.filter((r) => r.id === "5a422aa71b54a676234d17f8");
    expect(contents[0].likes).toEqual(3);
  }, 20000);
});

afterAll(() => {
  mongoose.connection.close();
});
