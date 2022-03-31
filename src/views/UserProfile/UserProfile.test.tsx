import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds, Texts } from 'src/constants'
import Profile from 'src/types/profile'
import UserProfile from './UserProfile'

describe('User Profile', () => {
  const profileMock: Profile = {
    posts: [],
    user: {
      id: 0,
      name: '',
      followers: [],
      followingIds: [],
      picturePath: '',
      username: ''
    },
    joinedAt: new Date(),
    followers: 0,
    following: 0
  }

  render(<UserProfile />)
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
    const { posts } = profileMock
    const postsTitle = screen.getByText(Texts.POSTS)
    const postsCountComponent = screen.getByTestId(TestIds.Profile.POSTS_COUNT)
    expect(postsTitle).toBeInTheDocument()
    expect(postsCountComponent.textContent).toBe(posts)
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
