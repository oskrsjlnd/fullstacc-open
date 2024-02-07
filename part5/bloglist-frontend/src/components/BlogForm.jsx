import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const sendBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form>
        title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} /><p />
        author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} /><p />
        url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} /><p />
        <input id='create_blog' type='submit' value='Create' onClick={sendBlog} />
      </form>
    </div>
  )
}

export default BlogForm