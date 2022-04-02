import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds } from 'src/constants'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { usePostsStore, useProfileStore } from 'src/stores'
import mockedPosts from 'src/mocks/posts'
import Profile from './Profile'

describe('User Profile', () => {
  beforeEach(() => render(<Profile />, { wrapper: MemoryRouter }))
  it('shows user data', async () => {
    const username = screen.getByTestId(TestIds.Profile.USERNAME)
    const joinedAt = screen.getByTestId(TestIds.Profile.JOINED_AT)
    const followersCount = screen.getByTestId(TestIds.Profile.FOLLOWERS)
    const followingCount = screen.getByTestId(TestIds.Profile.FOLLOWING)
    const pageComponents = [
      username,
      joinedAt,
      followersCount,
      followingCount
    ]

    pageComponents.forEach(
      (component) => expect(component).toBeInTheDocument()
    )
  })

  it('shows user posts', async () => {
    act(() => {
      usePostsStore.setState({ posts: mockedPosts })
      useProfileStore.setState({ postIds: mockedPosts.map((post) => post.id) })
    })

    mockedPosts.forEach((post) => {
      const textElement = screen.getByText(post.text)
      expect(textElement).toBeInTheDocument()
    })
  })
})
