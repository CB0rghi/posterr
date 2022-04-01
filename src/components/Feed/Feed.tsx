import React, { useEffect } from 'react'
import { Messages, Texts } from 'src/constants'
import { useUserStore, useFeedStore, useLayoutStore } from 'src/stores'
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
    filter, loadAllPosts, loadFollowingPosts, posts
  } = useFeedStore(
    (store) => (
      {
        filter: store.filter,
        loadAllPosts: store.loadAllPosts,
        loadFollowingPosts: store.loadFollowingPosts,
        posts: store.posts
      }
    )
  )

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
