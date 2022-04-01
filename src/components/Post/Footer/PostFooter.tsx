import React from 'react'
import { useUserStore } from 'src/stores'
import { Post } from 'src/types'
import Repost from './Repost'
import Quote from './Quote'
import Like from './Like'
import Share from './Share'

type PostFooterProps= {
  post: Post
}

export default function PostFooter({ post }: PostFooterProps) {
  const { loggedUser } = useUserStore((store) => ({
    loggedUser: store.loggedUser
  }))

  const isAuthor = loggedUser?.id === post.author.id

  const actionsIfNotAuthor = () => {
    if (isAuthor) return <div />

    return (
      <>
        <Repost post={post} />
        <Like />
        <Share />
      </>
    )
  }
  return (
    <div className="flex items-center justify-between w-full">
      <Quote />
      {actionsIfNotAuthor()}
    </div>
  )
}
