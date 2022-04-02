import React from 'react'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeDifference } from 'src/modules/date'
import { getCreatedAt } from 'src/modules/post'
import { Repost as RepostType } from 'src/types'
import PostActionProps from 'src/types/postActionProps'

export default function Repost({ post }: PostActionProps) {
  const { author } = post.repost as RepostType
  const timeAgo = timeDifference(getCreatedAt(post))
  const message = `Reposted by ${author.name} ${timeAgo}`
  return (
    <div className="text-xs text-gray-500">
      <FontAwesomeIcon icon={faRetweet} className="mr-2" />
      {message}
    </div>
  )
}
