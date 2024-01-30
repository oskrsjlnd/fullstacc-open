const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const testBlogposts = [
  {
    title: 'test title',
    author: 'test author',
    url: 'https://testurl.com',
    likes: 3
  },
  {
    title: 'test title2',
    author: 'test author2',
    url: 'https://testurl.com2',
    likes: 4
  }
]

const testPost = {
  author: 'test',
  title: 'titleTest',
  url: 'https://testurl.com'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = testBlogposts.map(blog => new Blog(blog))
  const blogPromiseArray = blogs.map(blog => blog.save())
  await Promise.all(blogPromiseArray)
})

describe('/api/blogs get tester', () => {
  test('blogs return type is correct', async () => {
    await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
  })
  
  test('correct blogs are rendered', async () => {
    const blogposts = await api.get('/api/blogs')
    const blogWithoutId = JSON.parse(blogposts.text).map(({id, ...blogposts}) => blogposts)
    expect(blogWithoutId).toContainEqual(testBlogposts[0])
    expect(blogWithoutId).toContainEqual(testBlogposts[1])
  })

  test('blogposts have id', async () => {
    const blogposts = await api.get('/api/blogs')
    const blogsWithId = JSON.parse(blogposts.text)
    blogsWithId.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('/api/blogs post tester', () => {
  test('blog post creates the correct entry to db', async () => {
    const shouldRespond = {
      author: 'test',
      title: 'titleTest',
      url: 'https://testurl.com'
    }
    const response = await api.post('/api/blogs').send(testPost)
    expect(response.status).toEqual(201)
    expect(response.body.author).toEqual(shouldRespond.author)
    expect(response.body.title).toEqual(shouldRespond.title)
    expect(response.body.url).toEqual(shouldRespond.url)
    expect(response.body.id).toBeDefined()
  })

  test('blog post likes default to 0', async () => {
    const response = await api.post('/api/blogs').send(testPost)
    expect(response.body.likes).toBe(0)
  })

  test('blog posts need url and title', async () => {
    const noUrl = await api.post('/api/blogs').send({
      author: 'exists',
      title: 'exists'
    })
    expect(noUrl.status).toBe(400)
    const noTitle = await api.post('/api/blogs').send({
      author: 'exists',
      url: 'exists'
    })
    expect(noTitle.status).toBe(400)
  }, 50000)
})

describe('deleting blogs', () => {
  test('error if deleting with malformed id', async () => {
    const response = await api.delete('/api/blogs/1')
    expect(response.body.error).toBe('The id is of incorrect type')
  })

  test('deleting with correct id responds with 204', async () => {
    const created = await api.post('/api/blogs').send({
      author: 'to delete',
      title: 'this entry',
      url: 'from the database'
    })
    const res = await api.delete(`/api/blogs/${created.body.id}`)
    expect(res.status).toBe(204)
  })
})

describe('updating blog', () => {
  test('updating blog works with correct body', async () => {
    const testData = await api.post('/api/blogs').send({
      author: 'to update author',
      title: 'update this title',
      url: 'update this url'
    })
    const updated = await api.put(`/api/blogs/${testData.body.id}`).send({
      author: 'new author',
      title: 'new title',
      url: 'new url',
      likes: 0
    })
    expect(updated.body.author).toEqual('new author')
    expect(updated.body.title).toEqual('new title')
    expect(updated.body.url).toEqual('new url')
    expect(updated.body.likes).toBe(1)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})