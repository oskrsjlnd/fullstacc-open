const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const initialUser = new User({
    username: 'root',
    name: 'admin',
    hashedPw: 'salattuSana'
  })
  const saved = await initialUser.save()
})

describe('user list accessible', () => {
  test('root user found', async () => {
    const users = await api.get('/api/users')
    expect(users.body[0].username).toEqual('root')
  })
})
describe('new user creation', () => {
  test('user creation requires an unique username', async () => {
    const usernameMissing = await api.post('/api/users').send({
      hashedPw: 'pelkkäSalasana'
    })
    expect(usernameMissing.status).toBe(400)
  })

  test('user creation requires a password', async () => {
    const pwMissing = await api.post('/api/users').send({
      username: 'pelkkäNimi'
    })
    expect(pwMissing.status).toBe(400)
  })

  test('user can not have duplicate username', async () => {
    const sameUsr = await api.post('/api/users').send({
      username: 'root',
      hashedPw: 'testiSalasana'
    })
    expect(sameUsr.status).toBe(400)
  })

  test('user can be created with valid info', async () => {
    const newUsr = await api.post('/api/users').send({
      username: 'uusi',
      name: 'nimi',
      password: 'validPassword'
    })
    expect(newUsr.statusCode).toBe(201)
  })

  test('username must be atleast 3 characters', async () => {
    const shortUser = await api.post('/api/users').send({
      username: '12',
      name: 'nimi',
      password: 'tarpeeksiPitka'
    })
    expect(shortUser.statusCode).toBe(400)
    expect(shortUser.body.error).toMatch(/^(User validation failed:)/)
  })

  test('password must be atleast 3 characters', async () => {
    const shortPw = await api.post('/api/users').send({
      username: 'longEnough',
      password: '12',
      name: 'nimiRiittänee'
    })
    expect(shortPw.statusCode).toBe(400)
    expect(shortPw.body.error).toEqual('password must consist of atleast 3 characters')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})