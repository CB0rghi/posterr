import React from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeDifference } from 'src/modules/date'
import { getCreatedAt } from 'src/modules/post'
import { Quote as QuoteType } from 'src/types'
import PostActionProps from 'src/types/postActionProps'

export default function Quote({ post, ...rest }: PostActionProps) {
  const { author, comment } = post.quote as QuoteType
  const timeAgo = timeDifference(getCreatedAt(post))
  const message = `${author.name} quoted "${comment}" ${timeAgo}`
  return (
    <div {...rest} className="text-xs text-gray-500">
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      {message}
    </div>
  )
}
