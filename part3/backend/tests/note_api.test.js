const mongoose=require('mongoose');
const app=require('../app.js');
const supertest=require('supertest');

const api= supertest(app);

test('Checking that the get endpoint is available',async()=>{
    await api
    .get('api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
  })
  
test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('HTML is easy')
})
