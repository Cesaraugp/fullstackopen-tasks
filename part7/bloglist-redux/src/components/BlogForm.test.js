import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleSubmit = jest.fn()

  const component = render(
    <BlogForm handleSubmit={handleSubmit} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.form')
  fireEvent.change(title, { 
    target: { value: 'Family' } 
  })
  fireEvent.change(author, { 
    target: { value: 'Vin Diesel' } 
  })
  fireEvent.change(url, { 
    target: { value: 'urlHere' } 
  })
  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  expect(handleSubmit.mock.calls[0][1]).toBe('Family')
  expect(handleSubmit.mock.calls[0][2]).toBe('Vin Diesel')
  expect(handleSubmit.mock.calls[0][3]).toBe('urlHere')
})