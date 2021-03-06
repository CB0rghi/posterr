import React, { useEffect } from 'react'
import { useLayoutStore, usePostsStore, useProfileStore } from 'src/stores'
import {
  Messages, TestIds, Texts
} from 'src/constants'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Avatar,
  CountSection,
  Modal,
  PostList,
  ProfileActionButton
} from 'src/components'

function Profile() {
  const userId = parseInt(useParams().userId as string, 10)
  const navigate = useNavigate()

  const { isLoading, startLoading, stopLoading } = useLayoutStore(
    (store) => ({
      isLoading: store.isLoading,
      startLoading: store.startLoading,
      stopLoading: store.stopLoading
    })
  )

  const { posts } = usePostsStore((store) => ({
    posts: store.posts
  }))

  const { user, loadProfile, postIds } = useProfileStore(
    (store) => ({
      loadProfile: store.loadProfile,
      postIds: store.postIds,
      user: store.user
    })
  )

  const profilePosts = posts.filter((post) => postIds.includes(post.id))

  useEffect(() => {
    const loadUserData = async () => {
      startLoading(Messages.LOADING_ITEM(Texts.PROFILE))
      await loadProfile(userId)
      stopLoading()
    }
    const shouldLoadNewProfile = (userId && userId !== user.id)
    if (shouldLoadNewProfile) {
      loadUserData()
    }
  }, [userId])

  const {
    name,
    followerIds,
    followingIds,
    joinedAt,
    username,
    picturePath
  } = user

  const renderIfNotLoading = () => {
    if (isLoading) {
      return <div />
    }
    return (
      <Modal title={Texts.PROFILE} onClose={() => navigate('/')}>
        <section className="w-full px-4">
          <div className="flex justify-between items-end">
            <Avatar
              src={picturePath}
              username={username}
              width={100}
              height={100}
              size="big"
            />
            <ProfileActionButton />
          </div>
          <p
            data-testid={TestIds.Profile.NAME}
            className="pt-2 text-xl font-medium"
          >
            {name}
          </p>
          <p
            data-testid={TestIds.Profile.USERNAME}
            className="text-sm font-normal text-gray-800"
          >
            {username}
          </p>
          <div data-testid={TestIds.Profile.JOINED_AT} className="pt-2 text-sm text-gray-600">
            {Messages.JOINED_AT(joinedAt)}
          </div>
          <div className="flex justify-between pt-2">
            <CountSection
              data-testid={TestIds.Profile.POSTS_COUNT}
              number={profilePosts.length}
              text={Texts.POSTS}
            />
            <CountSection
              data-testid={TestIds.Profile.FOLLOWERS}
              number={followerIds.length}
              text="Followers"
            />
            <CountSection
              data-testid={TestIds.Profile.FOLLOWING}
              number={followingIds.length}
              text="Following"
            />
          </div>
          <PostList className="mt-6" posts={profilePosts} />
        </section>
      </Modal>
    )
  }
  return renderIfNotLoading()
}

export default Profile
