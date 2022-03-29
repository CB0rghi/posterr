import React from 'react'
import { useProfileStore } from 'src/stores'
import { Messages } from 'src/constants'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Post } from 'src/types'
import mockPost from 'src/mocks/post'
import Feed from './Feed'

describe('Feed', () => {
  beforeEach(() => render(<Feed />))

  it('render NO_POSTS_MESSAGE when there\'s no post', () => {
    act(() => {
      useProfileStore.setState({ posts: [] }, true)
    })
    const noPostsFoundComponent = screen.getByText(Messages.NO_POSTS_FOUND)
    expect(noPostsFoundComponent).toBeInTheDocument()
  })

  it('render posts when they exists', () => {
    const mockedPosts: Post[] = [
      mockPost
    ]
    act(() => {
      useProfileStore.setState({ posts: mockedPosts }, true)
    })
    mockedPosts.forEach((post) => {
      const postText = screen.getByText(post.text)
      expect(postText).toBeInTheDocument()
    })
  })

  it('shows only following users posts if configured', () => {

  })
})
