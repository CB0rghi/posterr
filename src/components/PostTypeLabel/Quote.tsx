import React from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeDifference } from 'src/modules/date'
import { getCreatedAt } from 'src/modules/post'
import { Post, Quote as QuoteType } from 'src/types'

type QuoteProps = {
  post: Post
}

export default function Quote({ post }: QuoteProps) {
  const { author, comment } = post.quote as QuoteType
  const timeAgo = timeDifference(getCreatedAt(post))
  const message = `${author.name} quoted "${comment}" ${timeAgo}`
  return (
    <div className="text-xs text-gray-500">
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      {message}
    </div>
  )
}
