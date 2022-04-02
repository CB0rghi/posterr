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
  const { post } = props
  const { type } = post

  if (isOriginal(type)) return <div />
  if (isRepost(type)) return <Repost post={post} />
  if (isQuote(type)) return <Quote post={post} />
  throw Error(Messages.TYPE_NOT_IMPLEMENTED)
}
