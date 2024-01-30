const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, pw } = req.body
  const user = await User.findOne({ username })
  const pwOk = user === null
    ? false
    : await bcrypt.compare(pw, user.hashedPw)
  
  if (!(user && pwOk)) {
    return res.status(401).json({
      error: 'incorrect username or password'
    })
  }

  const tokenUser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(tokenUser, process.env.SECRET)
  res.status(200).send({
    token,
    username: user.username
  })
})

module.exports = loginRouter