import React, { useEffect } from 'react'
import { Messages, Texts } from 'src/constants'
import {
  useUserStore,
  useLayoutStore,
  usePostsStore
} from 'src/stores'
import { Prop } from 'src/types'
import PostList from '../PostList/PostList'

function Feed(props: Prop) {
  const { startLoading, stopLoading } = useLayoutStore(
    (store) => (
      {
        startLoading: store.startLoading,
        stopLoading: store.stopLoading
      })
  )

  const { user } = useUserStore((store) => ({ user: store.loggedUser }))

  const {
    filter,
    posts,
    loadAllPosts,
    loadFollowingPosts
  } = usePostsStore((store) => ({
    filter: store.filter,
    posts: store.posts,
    loadAllPosts: store.loadAllPosts,
    loadFollowingPosts: store.loadFollowingPosts
  }))

  useEffect(() => {
    const loadPosts = async () => {
      const isFollowing = filter === Texts.FOLLOWING
      startLoading(Messages.LOADING_ITEM(Texts.POSTS))
      if (isFollowing && user) {
        await loadFollowingPosts(user)
      } else {
        await loadAllPosts()
      }
      stopLoading()
    }

    loadPosts()
  }, [filter, user?.followingIds])

  return <PostList {...props} posts={posts} />
}

export default Feed
