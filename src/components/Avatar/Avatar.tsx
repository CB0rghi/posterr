import React from 'react'
import Prop from 'src/types/prop'

type AvatarProps = Prop & {
  src: string
  username: string
}

export default function Avatar({ src, username, ...rest }: AvatarProps) {
  return (
    <img
      alt={username}
      className="inline-block h-10 w-10 rounded-full"
      src={src}
      {...rest}
    />
  )
}
