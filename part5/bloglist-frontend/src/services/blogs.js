import axios from 'axios'
const baseUrl = '/api/blogs'



const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async (blog, token) => {
  const conf = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, blog, conf)
  return response.data
}

const putToBlog = async (blog, id, token) => {
  const conf = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const response = await axios.put(baseUrl+`/${id}`, blog, conf)
  return response.data
}

const removeBlog = async (id, token, user) => {
  const conf = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const response = await axios.delete(baseUrl+`/${id}`, conf)
  return response.data
}

export default { getAll, newBlog, putToBlog, removeBlog }