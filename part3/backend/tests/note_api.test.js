const mongoose=require('mongoose');
const app=require('../app.js');
const supertest=require('supertest');

const api= supertest(app);

test('Checking that the get endpoint is available',async()=>{
    await api
    .get('/api/notes/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five notes', async () => {
    const response = await api.get('/api/notes/')
   
    expect(response.body).toHaveLength(5)
  })
  
test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('HTML is Easy')
})


afterAll(() => {
    mongoose.connection.close()
})
