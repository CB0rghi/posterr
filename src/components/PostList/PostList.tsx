import React from 'react'
import { Messages } from 'src/constants'
import { Post as PostType, Prop } from 'src/types'
import Post from '../Post/Post'

type PostListProps = Prop & {
  posts: PostType[]
}

export default function PostList({ posts, ...rest }: PostListProps) {
  const hasPosts = Boolean(posts.length)

  if (hasPosts) {
    return (
      <div {...rest}>
        {posts.map((post) => (<Post key={post.id} post={post} />))}
      </div>
    )
  }

  return <span {...rest}>{Messages.NO_POSTS_FOUND}</span>
}
