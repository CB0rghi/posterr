import React from 'react'
import { Post } from 'src/types'
import { Author } from 'src/components'
import { TestIds } from 'src/constants'
import PostType from '../PostType/PostType'

export default function PostComponent(props: Post) {
  const { author, text, type } = props
  return (
    <article className="p-4">
      <PostType
        data-testid={TestIds.Post.TYPE}
        type={type}
      />
      <Author
        data-testid={TestIds.Post.AUTHOR}
        {...author}
      />
      <div className="pt-2">
        <p
          data-testid={TestIds.Post.TEXT}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: text }}
          className="text-base width-auto text-black flex-shrink"
        />
      </div>
    </article>
  )
}
