import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))}
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin} id='login-form'>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
  const blogForm = () => (
    <Togglable buttonLabel="create new Blog" buttonId="new-blog-btn">
      <BlogForm handleSubmit={newBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('error: Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.href =`${window.location.href}` //No-self assigned vars
  }
  const likeBlog = async (likes, id) => {
    try {
      const returnedBlog = await blogService.like({ likes }, id)
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
      setErrorMessage(`The blog ${returnedBlog.title} received a like `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(
        blogs.filter((blog) => blog.id !== id).sort((a, b) => b.likes - a.likes)
      )
      setErrorMessage('A blog Has been DELETED')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const newBlog = async (e, title, author, url) => {
    e.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    const result = await blogService.create(blog)
    setBlogs(blogs.concat(result))
    setErrorMessage(`a new Blog ${title} by ${author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          Welcome! {user.name}, you are logged in{' '}
          <button onClick={logOut}>Log Out</button>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={likeBlog}
              handleRemove={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
