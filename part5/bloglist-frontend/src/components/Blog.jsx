import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [expand, setExpand] = useState(false)
  const hide = { display: expand ? 'none' : '' }
  const show = { display: expand ? '' : 'none' }
  const ownBlog = window.localStorage.getItem('username') === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none',
    marginLeft: '-40px'
  }

  const deleteButton = {
    backgroundColor: 'lightblue',
    borderRadius: '5px',
    marginBottom: '5px'
  }

  const toggleVisible = () => {
    setExpand(!expand)
  }

  const addLike = () => {
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    },
    blog.id)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  const delButton = () => (
    <>
    <p />
    <button className='delete' style={deleteButton} onClick={deleteBlog}>remove</button>
    </>
  )

  console.log(ownBlog)

  return (
    <li className='blogCont' style={blogStyle}>
      <div className='blog_shrinked' id={'compact_'+blog.id} style={hide}>
        Title: {blog.title} <button className='show_blog' onClick={toggleVisible}>show</button>

      </div>
      <div className='blog_expanded' id={'expanded_'+blog.id} style={show}>
        Title: {blog.title} <button className='hide_blog' onClick={toggleVisible}>hide</button>
        <p />
        Author: {blog.author}
        <p />
        Url: {blog.url}
        <p className='likes' />
        Likes: {blog.likes} <button className='like' onClick={addLike}>like</button>
        <p />
        {blog.user.name}
        {ownBlog && delButton()}
      </div>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}
export default Blog