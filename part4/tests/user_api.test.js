const User= require('../models/users');
const mongoose= require('mongoose');
const app= require('../app');
const supertest = require("supertest");
const helper= require('./user_test_helper')
const bcrypt= require('bcryptjs');

const api= supertest(app);
 beforeEach(async () => {
    
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  },5000)

describe('User creation',()=>{
 
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

   
  },7000)

  test('User with invalid username or password not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'cesar',
      name: 'Cesar_perez',
      password: '12',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  },7000)


})

afterAll(() => { 
  mongoose.connection.close()
})