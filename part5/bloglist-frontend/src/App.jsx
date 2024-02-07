import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPw] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort((a, b) => b.likes - a.likes)
      )
    )
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('username')) {
      setUser({
        token: window.localStorage.getItem('token'),
        username: window.localStorage.getItem('username'),
        name: window.localStorage.getItem('name')
      })
    }
  }, [])

  const blogFormRef = useRef()

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      console.log(user)
      setUser(user)
      notify(`logged in as ${user.name}`, 'info')
      setUsername('')
      setPw('')
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('name', user.name)
      window.localStorage.setItem('username', user.username)
    } catch (exception) {
      if (exception.response.status === 401) {
        notify('wrong username or password', 'error')
      } else {
        notify(exception.message, 'error')
      }
    }
  }

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    notify('You have been logged out', 'info')
  }

  const createBlog = async (blogObj) => {
    try {
      const blog = await blogService.newBlog(
        blogObj,
        window.localStorage.getItem('token')
      )
      blog['user'] = currentUser()
      setBlogs(blogs.concat(blog))
      notify(`a new blog ${blog.title} by ${blog.author} added`, 'info')
    } catch (exception) {
      notify(exception.message, 'error')
    }
    blogFormRef.current.toggleVisible()
  }

  const currentUser = () => {
    return {
      username: window.localStorage.getItem('username'),
      name: window.localStorage.getItem('name'),
      id: window.localStorage.getItem('id'),
    }
  }

  const renderBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm notify={notify} setNotification={setNotification} createBlog={createBlog} />
    </Togglable>
  )

  const updateBlog = async (blogObj, id) => {
    try {
      const returnedBlog = await blogService.putToBlog(
        blogObj,
        id,
        window.localStorage.getItem('token')
      )
      returnedBlog['user'] = currentUser()
      const updatedBlogs = blogs.map(blog => blog.id === id ? returnedBlog : blog)
      setBlogs(
        updatedBlogs.sort((a, b) => b.likes - a.likes)
      )
      notify(`liked ${returnedBlog.title}`, 'info')
    } catch (exception) {
      notify(exception.message, 'error')
    }
  }

  const removeBlog = async (blogObj) => {
    if (window.confirm(`Do you want to delete ${blogObj.title} by ${blogObj.author}?`)) {
      try {
        await blogService.removeBlog(
          blogObj.id,
          window.localStorage.getItem('token')
        )
        notify(`${blogObj.title} by ${blogObj.author} was deleted successfully`, 'info')
        const updatedBlogs = blogs.filter(blog => blog.id !== blogObj.id)
        setBlogs(updatedBlogs)
      } catch (exception) {
        notify(exception.message, 'error')
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Notification notification={notification} />
        <form onSubmit={login}>
          username: <input id='username' value={username} onChange={({ target }) => setUsername(target.value)} /> <br />
          password: <input id='password' value={password} onChange={({ target }) => setPw(target.value)} type='password' /> <br />
          <input id='login' type='submit' onClick={login} value='login' />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button id='logout' onClick={logOut}>
        logout
      </button>
      {renderBlogForm()}
      <p />
      <ul id='blog_list'>
        {blogs.map(blog =>
          <Blog updateBlog={updateBlog} removeBlog={removeBlog} key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App