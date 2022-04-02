import React from 'react'
import { usePostsStore, useProfileStore } from 'src/stores'
import { Messages } from 'src/constants'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Post } from 'src/types'
import mockPost from 'src/mocks/post'
import mockUser from 'src/mocks/user'
import Feed from './Feed'

describe('Feed', () => {
  beforeEach(() => render(<Feed />))

  it('render NO_POSTS_MESSAGE when there\'s no post', () => {
    act(() => {
      usePostsStore.setState({ posts: [] })
    })
    const noPostsFoundComponent = screen.getByText(Messages.NO_POSTS_FOUND)
    expect(noPostsFoundComponent).toBeInTheDocument()
  })

  it('render posts when exists', () => {
    const mockedPosts: Post[] = [
      mockPost
    ]

    act(() => {
      usePostsStore.setState({ posts: mockedPosts })
    })

    mockedPosts.forEach((post) => {
      const postText = screen.getByText(post.text)
      expect(postText).toBeInTheDocument()
    })
  })

  it('shows only following users posts if configured', () => {
    const loadFollowingPostsSpy = jest.spyOn(usePostsStore.getState(), 'loadFollowingPosts')
    act(() => {
      useProfileStore.setState({ user: mockUser })
      usePostsStore.setState({ filter: 'Following' })
    })
    expect(loadFollowingPostsSpy).toHaveBeenCalled()
  })
})
