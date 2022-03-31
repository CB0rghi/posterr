import React, { useEffect } from 'react'
import { Messages, Texts } from 'src/constants'
import { useAuthStore, useFeedStore, useLayoutStore } from 'src/stores'
import PostComponent from 'src/components/Post/Post'

const Feed = () => {
  const { startLoading, stopLoading } = useLayoutStore(
    (store) => (
      {
        startLoading: store.startLoading,
        stopLoading: store.stopLoading
      })
  )

  const { user } = useAuthStore((store) => ({ user: store.loggedUser }))
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
      if (isFollowing) {
        // Load following posts only
        await loadFollowingPosts(user)
      } else {
        // Load all posts
        await loadAllPosts()
      }
      stopLoading()
    }

    loadPosts()
  }, [filter])

  // eslint-disable-next-line react/no-array-index-key
  const renderPosts = () => (posts.map((post, i) => (<PostComponent key={i} {...post} />)))

  const render = () => {
    if (!posts.length) {
      return <span>{Messages.NO_POSTS_FOUND}</span>
    }

    return (
      <div>
        <span>Feed</span>
        {renderPosts()}
      </div>
    )
  }

  return render()
}

export default Feed
