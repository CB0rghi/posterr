import React from 'react'

type PostTypeProps = {
  type: string
}

export default function PostType(props: PostTypeProps) {
  const { type } = props
  switch (type) {
    case 'ORIGINAL':
      return <div />
    case 'REPOST':
      return <div>Reposted</div>

    default:
      return <div>Quoted</div>
  }
}
