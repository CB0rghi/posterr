import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds } from 'src/constants'
import mockPost from 'src/mocks/post'
import { MemoryRouter } from 'react-router-dom'
import Post from './Post'

describe('Post', () => {
  beforeEach(() => render(<Post post={mockPost} />, { wrapper: MemoryRouter }))

  it('renders text', () => {
    const postText = screen.getByTestId(TestIds.Post.TEXT)
    expect(postText).toBeInTheDocument()
    expect(postText.textContent).toBe(mockPost.text)
  })

  it('renders author', () => {
    const author = screen.getByTestId(TestIds.Author.PICTURE)
    expect(author).toBeInTheDocument()
  })

  it('renders type', () => {
    const type = screen.getByTestId(TestIds.Post.TYPE)
    expect(type).toBeInTheDocument()
  })

  it('renders footer', () => {
    const footer = screen.getByTestId(TestIds.Post.ACTIONS)
    expect(footer).toBeInTheDocument()
  })
})
