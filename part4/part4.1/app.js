const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogroutes')
const usersRouter = require('./controllers/users')
const log = require('./utils/log')
const mongoose = require('mongoose')
const mid = require('./utils/middleware')

mongoose.set('strictQuery', false)
log.info('Connecting to database')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    log.info('Connected to database.')
  })
  .catch(error => {
    log.error('Error while connecting to database:', error.message)
  })

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(mid.extractToken)
app.use('/api/login', loginRouter)
app.use('/api/blogs', mid.extractUser, blogsRouter)
app.use('/api/users', mid.extractUser, usersRouter)
app.use(mid.errorHandler)

module.exports = app