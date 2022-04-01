import React from 'react'
import { Messages } from 'src/constants'
import { Post as PostType, Prop } from 'src/types'
import Post from '../Post/Post'

type PostListProps = Prop & {
  posts: PostType[]
}

export default function PostList({ posts }: PostListProps) {
  const hasPosts = Boolean(posts.length)

  if (hasPosts) {
    return (
      <>
        {posts.map((post) => (<Post key={post.id} post={post} />))}
      </>
    )
  }

  return <span>{Messages.NO_POSTS_FOUND}</span>
}
