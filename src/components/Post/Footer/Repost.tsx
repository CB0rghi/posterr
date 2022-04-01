import React from 'react'
import { Texts } from 'src/constants'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useFeedStore, useUserStore } from 'src/stores'
import { Post, User } from 'src/types'
import FooterAction from './FooterAction'

type ReportProps = {
  post: Post
}

export default function Repost({ post }: ReportProps) {
  const { repost } = useFeedStore((store) => ({
    repost: store.repost
  }))

  const user = useUserStore((store) => store.loggedUser) as User

  const handleClick = async () => {
    await repost(post, user)
  }

  return (
    <FooterAction
      title={Texts.REPOST}
      icon={faRetweet}
      count={0}
      onClick={handleClick}
    />
  )
}
