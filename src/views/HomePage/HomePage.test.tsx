import React from 'react'
import { render, screen } from '@testing-library/react'
import { Messages, TestIds } from 'src/constants'
import HomePage from './HomePage'

describe('Home Page', () => {
  render(<HomePage />)
  it('renders a list of posts', () => {
    const postList = screen.getByTestId(TestIds.Home.POSTS)
    expect(postList).toBeInTheDocument()
  })

  it('renders toggle switch', () => {
    const postsSwitch = screen.getByTestId(TestIds.Home.SWITCHER)
    expect(postsSwitch).toBeInTheDocument()
  })

  it('renders new post button', () => {
    const newPostButton = screen.getByText(Messages.NO_POSTS_FOUND)
    expect(newPostButton).toBeInTheDocument()
  })
})
