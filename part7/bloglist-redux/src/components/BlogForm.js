import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  return (
    <div>
      <h2>create new</h2>
      <form className='form' onSubmit={(e) => handleSubmit(e, title, author, url)}>
        <div>
          title:{' '}
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  )
}


BlogForm.propTypes={
  handleSubmit:PropTypes.func.isRequired
}
export default BlogForm
