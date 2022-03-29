import React from 'react'
import { useProfileStore } from 'src/stores'
import { TestIds, Texts } from 'src/constants'
import Avatar from 'src/components/Avatar/Avatar'

export default function UserProfile() {
  const profileStore = useProfileStore()

  const {
    joinedAt, followers, following, user
  } = profileStore

  const { picturePath, username } = user

  const {
    USERNAME, JOINED_AT, FOLLOWERS, FOLLOWING
  } = TestIds.Profile

  const header = () => (
    <div className="flex flex-col">
      <Avatar src={picturePath} username={username} />
    </div>
  )

  return (
    <>
      {header()}
      <div data-testid={USERNAME}>{username}</div>
      <div data-testid={JOINED_AT}>{joinedAt?.toLocaleDateString()}</div>
      <div data-testid={FOLLOWERS}>{followers}</div>
      <div data-testid={FOLLOWING}>{following}</div>
      <div>
        {Texts.POSTS}
      </div>
    </>
  )
}
