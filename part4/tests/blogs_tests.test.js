let app= require('../app')
const supertest=require('supertest')
const mongoose= require('mongoose');
const Blog= require('../models/blog');
const helper= require('./blogs_tests_helper');

api= supertest(app);


beforeEach(async()=>{
    await Blog.deleteMany({})
    const blogsArray=helper.initialBlogsList.map(blog=>{
        let blogToSave= new Blog(blog);
        return blogToSave.save();
    });
    await Promise.all(blogsArray);
},15000)

describe('Blogs content',()=>{
    test('Get the amount of blogs',async()=>{
        const response = await api.get("/api/blogs/");
        expect(response.body).toHaveLength(helper.initialBlogsList.length);
    })
    test('Property name id',async()=>{
        const response = await api.get("/api/blogs/");
        expect(response.body[0].id).toBeDefined();
    })  
})

afterAll(()=>{
    mongoose.connection.close();
})