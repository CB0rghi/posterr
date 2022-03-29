import React from 'react'
import { Messages } from 'src/constants'
import { useFeedStore } from 'src/stores'
import PostComponent from '../Post/Post'

export default function Feed() {
  const { posts } = useFeedStore((store) => ({ posts: store.posts }))

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
