import React from 'react'
import { useUserStore, useLayoutStore, useProfileStore } from 'src/stores'
import { User } from 'src/types'
import CustomButton from '../CustomButton/CustomButton'
import NewPostButton from '../NewPostButton/NewPostButton'

export default function ProfileActionButton() {
  const {
    loggedUser,
    follow,
    unfollow
  } = useUserStore((store) => ({
    loggedUser: store.loggedUser as User,
    follow: store.follow,
    unfollow: store.unfollow
  }))

  const { startLoading, stopLoading } = useLayoutStore((store) => ({
    startLoading: store.startLoading,
    stopLoading: store.stopLoading
  }))

  const {
    addFollower,
    removeFollower,
    profileUser
  } = useProfileStore((store) => ({
    addFollower: store.addFollower,
    removeFollower: store.removeFollower,
    profileUser: store.user
  }))

  const isLoggedUser = loggedUser.id === profileUser.id
  if (isLoggedUser) {
    return <NewPostButton />
  }

  const isFollower = loggedUser.followingIds.includes(profileUser.id)
  if (isFollower) {
    const handleUnfollowClick = async () => {
      startLoading()
      await unfollow(profileUser.id)
      removeFollower(loggedUser.id)
      stopLoading()
    }

    return (
      <CustomButton
        text="Following"
        textOnHover="Unfollow"
        onClick={handleUnfollowClick}
      />
    )
  }

  const handleFollowClick = async () => {
    startLoading()
    await follow(profileUser.id)
    addFollower(loggedUser.id)
    stopLoading()
  }

  return (
    <CustomButton
      text="Follow"
      onClick={handleFollowClick}
    />
  )
}
