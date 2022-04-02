import React from 'react'
import { Messages } from 'src/constants'
import {
  isOriginal, isQuote, isRepost
} from 'src/modules/postType'
import {
  Post,
  Prop
} from 'src/types'
import Quote from './Quote'
import Repost from './Repost'

type PostTypeProps = Prop & {
  post: Post
}

export default function PostTypeComponent(props: PostTypeProps) {
  const { post, ...rest } = props
  const { type } = post

  if (isOriginal(type)) return <div {...rest} />
  if (isRepost(type)) return <Repost post={post} {...rest} />
  if (isQuote(type)) return <Quote post={post} {...rest} />
  throw Error(Messages.TYPE_NOT_IMPLEMENTED)
}
