import React from 'react'
import { useAuthStore, useProfileStore } from 'src/stores'
import CustomButton from '../CustomButton/CustomButton'

export default function ProfileActionButton() {
  const { loggedUser } = useAuthStore((store) => ({ loggedUser: store.loggedUser }))
  const { profileUser } = useProfileStore((store) => ({ profileUser: store.user }))

  const isLoggedUser = loggedUser.id === profileUser.id
  if (isLoggedUser) {
    return (
      <CustomButton
        text="New Post"
        onClick={() => console.log('Clicked')}
      />
    )
  }

  const isFollower = loggedUser.followingIds.includes(profileUser.id)
  if (isFollower) {
    return (
      <CustomButton
        text="Following"
        textOnHover="Unfollow"
        onClick={() => console.log('Unfollowed!')}
      />
    )
  }

  return (
    <CustomButton
      text="Follow"
      onClick={() => console.log('Follow!')}
    />
  )
}
