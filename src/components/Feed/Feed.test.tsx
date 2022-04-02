import React from 'react'
import { usePostsStore, useProfileStore } from 'src/stores'
import { Messages } from 'src/constants'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import mockedPosts from 'src/mocks/posts'
import { MemoryRouter } from 'react-router-dom'
import mockUser from 'src/mocks/user'
import Feed from './Feed'

describe('Feed', () => {
  beforeEach(() => render(<Feed />, { wrapper: MemoryRouter }))

  it('render NO_POSTS_MESSAGE when there\'s no post', () => {
    act(() => {
      usePostsStore.setState({ feedPosts: [] })
    })
    const noPostsFoundComponent = screen.getByText(Messages.NO_POSTS_FOUND)
    expect(noPostsFoundComponent).toBeInTheDocument()
  })

  it('render posts when exists', () => {
    act(() => {
      usePostsStore.setState({ feedPosts: mockedPosts })
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
