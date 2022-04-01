import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds } from 'src/constants'
import mockPost from 'src/mocks/post'
import Post from './Post'

describe('Post', () => {
  beforeEach(() => render(<Post post={mockPost} />))

  it('renders text', () => {
    const postText = screen.getByTestId(TestIds.Post.TEXT)
    expect(postText).toBeInTheDocument()
    expect(postText.textContent).toBe(mockPost.text)
  })

  it('renders author', () => {
    const author = screen.getByTestId(TestIds.Post.AUTHOR)
    expect(author).toBeInTheDocument()
  })

  it('renders type', () => {
    const type = screen.getByTestId(TestIds.Post.TYPE)
    expect(type).toBeInTheDocument()
    expect(type.textContent).toBe(mockPost.type)
  })
})
