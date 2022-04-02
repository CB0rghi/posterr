import React from 'react'
import { Messages, Texts } from 'src/constants'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { usePostsStore, useUserStore } from 'src/stores'
import { Post, User } from 'src/types'
import { toast } from 'react-toastify'
import FooterAction from './FooterAction'

type ReportProps = {
  post: Post
}

export default function Repost({ post }: ReportProps) {
  const { repostCount } = post
  const { repost } = usePostsStore((store) => ({
    repost: store.repost
  }))

  const user = useUserStore((store) => store.loggedUser) as User

  const handleClick = async () => {
    if (post.repost?.author.id === user.id) {
      toast.error(Messages.ALREADY_REPOSTED)
      return
    }
    await repost(post, user)
  }

  return (
    <FooterAction
      title={Texts.REPOST}
      icon={faRetweet}
      count={repostCount}
      onClick={handleClick}
    />
  )
}
