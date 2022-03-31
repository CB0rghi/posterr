import React, { useEffect } from 'react'
import { Messages, Texts } from 'src/constants'
import { useFeedStore, useProfileStore } from 'src/stores'
import PostComponent from 'src/components/Post/Post'

export default function Feed() {
  const { user } = useProfileStore((store) => ({ user: store.user }))
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
      if (isFollowing) {
        // Load following posts only
        await loadFollowingPosts(user)
      } else {
        // Load all posts
        await loadAllPosts()
      }
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
