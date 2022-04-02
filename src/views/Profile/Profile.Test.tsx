import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds, Texts } from 'src/constants'
import { Profile as ProfileType } from 'src/types'
import mockUser from 'src/mocks/user'
import Profile from './Profile'

describe('User Profile', () => {
  const profileMock: ProfileType = {
    postIds: [],
    user: mockUser
  }

  render(<Profile />)
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
    const { postIds } = profileMock
    const postsTitle = screen.getByText(Texts.POSTS)
    const postsCountComponent = screen.getByTestId(TestIds.Profile.POSTS_COUNT)
    expect(postsTitle).toBeInTheDocument()
    expect(postsCountComponent.textContent).toBe(postIds)
  })

  // it('shows following component if profile is followed by logged user')
  // it('does not shows following component if profile is not follower be logged user')

  // it('renders follow button if is following')
  // it('renders unfollow button if is not following')

  // it('calls api to follow user')
  // it('calls api to unfollow user')

  // it('renders new post button')
  // it('it renders new post component when button is clicked')
})
