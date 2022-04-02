import React, { useState } from 'react'
import { Messages, Texts } from 'src/constants'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import Comment from 'src/components/Comment/Comment'
import { Post } from 'src/types'
import FooterAction from './FooterAction'

type QuoteProps = {
  post: Post
}
export default function Quote({ post }: QuoteProps) {
  const [showModal, setModal] = useState(false)
  const { quoteCount: count } = post

  return (
    <>
      {showModal && (
        <Comment
          onClose={() => setModal(false)}
          post={post}
          placeholder={Messages.QUOTE_PLACEHOLDER}
          type="QUOTE"
          title={Texts.QUOTE}
        />
      )}
      <FooterAction
        title={Texts.QUOTE}
        icon={faComment}
        count={count}
        onClick={() => setModal(true)}
      />
    </>
  )
}
