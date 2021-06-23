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

describe('Testing addition/removal of blogs',()=>{
    test('Create a new blog',async()=>{
        const newBlog= {
            title: "Carnaval is everyday",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
          }

        await api
        .post('/api/blogs/')
        .send(newBlog).expect(201)
        .expect("Content-Type", /application\/json/);

        const blogs= await helper.getAllBlogs();
        expect(blogs).toHaveLength(helper.initialBlogsList.length+1);
        const contents = blogs.map((r) => r.title);
        expect(contents).toContain("Carnaval is everyday");
    },7000)
    test('Create a blog without likes defaults to 0',async()=>{
        const newBlog= {
            title: "Carnaval is everyday",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          }

        await api
        .post('/api/blogs/')
        .send(newBlog).expect(201)
        .expect("Content-Type", /application\/json/);
        const blogs= await helper.getAllBlogs();
        const contents = blogs.filter((r) => r.title =='Carnaval is everyday' );
        console.log(contents);
        expect(contents[0].likes).toEqual(0);
    },7000)

    test('A blog without title and url is not created',async()=>{
        const newBlog= {
            likes:3,
          };
      
          await api.post("/api/blogs").send(newBlog).expect(400);
      
          const blogsAtEnd = await helper.getAllBlogs();
          expect(blogsAtEnd).toHaveLength(helper.initialBlogsList.length);
    })

    test('delete a blog',async()=>{
        const blogId= '5a422aa71b54a676234d17f8'
        await api.delete(`/api/blogs/${blogId}`).expect(204);

        const response = await api.get("/api/blogs/");
        expect(response.body).toHaveLength(helper.initialBlogsList.length-1);

    },20000)


//Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.
//Once the test is finished, refactor the operation to use async/await instead of promises.

})

afterAll(()=>{
    mongoose.connection.close();
})