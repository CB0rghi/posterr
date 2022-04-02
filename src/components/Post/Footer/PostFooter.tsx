import React from 'react'
import { useUserStore } from 'src/stores'
import PostActionProps from 'src/types/postActionProps'
import Repost from './Repost'
import Quote from './Quote'
import Like from './Like'
import Share from './Share'

export default function PostFooter({ post, ...rest }: PostActionProps) {
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
    <div {...rest} className="flex items-center justify-between w-full">
      <Quote post={post} />
      {actionsIfNotAuthor()}
    </div>
  )
}
