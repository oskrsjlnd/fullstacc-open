const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})
  
blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: req.user.id
  })
  const resp = await blog.save()
  req.user.blogs = req.user.blogs.concat(resp._id)
  await req.user.save()
  res.status(201).json(resp)
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('user', { id: 1 })

  if (!blog) {
    return res.status(404).json({
      error: 'blog not found'
    })
  }

  if (!(blog.user.id === req.user.id)) {
    return res.status(401).json({
      error: 'you can only delete your own blogs'
    })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.sendStatus(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const blogpost = {
    author: req.body.author,
    title: req.body.title,
    url: req.body.url,
    likes: req.body.likes+1
  }
  const updated = await Blog.findByIdAndUpdate(
    req.params.id, 
    blogpost, 
    { new: true }
  )
  res.json(updated)
})
module.exports = blogsRouter