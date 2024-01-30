const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, { likes }) => accumulator + likes, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes
    ? prev
    : current
  })
  return favBlog
}

// const mostBlogs = (blogs) => {
  // const blogMaestro = blogs.reduce((authorBlogs, { author }) => {
    // authorBlogs[author] = (authorBlogs[author] || 0) + 1
    // return authorBlogs
  // }, {})
  // const blogMaestro = lodash.groupBy(blogs, { author })
  // return blogMaestro
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs
}