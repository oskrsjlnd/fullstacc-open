const log = require('./log')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
  log.error(err.stack)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'The id is of incorrect type' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message })
  }
  next(err)
}

const extractToken = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization  && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const extractUser = async (req, res, next) => {
  const token = jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(token.id)
  if (user) {
    req.user = user
  }
  next()
}

module.exports = {
  errorHandler,
  extractToken,
  extractUser
}