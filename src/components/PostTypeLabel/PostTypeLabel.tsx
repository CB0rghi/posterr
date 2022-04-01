import React from 'react'
import { PostType, Prop, User } from 'src/types'

type PostTypeProps = Prop & {
  type: PostType
  postOwner?: User
}

const getTypeLabel = (type: 'REPOST' | 'QUOTE') => (
  type === 'REPOST'
    ? 'Reposted'
    : 'Quoted'
)

export default function PostTypeComponent(props: PostTypeProps) {
  const { type, className, postOwner } = props
  if (type === 'ORIGINAL') return <div />

  const classes = `
    ${className} 
    text-xs text-gray-500
  `
  const typeLabel = getTypeLabel(type)
  const message = `${typeLabel} by ${postOwner?.name}`
  return <div className={classes}>{message}</div>
}
