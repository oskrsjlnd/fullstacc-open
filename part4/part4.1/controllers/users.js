const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1, id: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const salt = 10
  if (!username || !password || password.length < 3) {
    res.status(400)
      .json({
        error: 'password must consist of atleast 3 characters'
      })
      .end()
  }
  const hashedPw = await bcrypt.hash(password, salt)
  const newUser = new User({
    username: username,
    hashedPw: hashedPw,
  })
  const saved = await newUser.save()
  res.status(201).json(saved)
})

module.exports = usersRouter