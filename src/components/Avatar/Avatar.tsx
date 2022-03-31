/* eslint-disable react/require-default-props */
import React, { useMemo, useState } from 'react'
import Prop from 'src/types/prop'

type AvatarProps = Prop & {
  src: string
  username: string
  size?: 'small' | 'medium' | 'big'
}

export default function Avatar({
  src, username, size = 'small', ...rest
}: AvatarProps) {
  const [sizeValue, setSizeValue] = useState(3)

  useMemo(() => {
    switch (size) {
      case 'medium':
        setSizeValue(6)
        break

      case 'big':
        setSizeValue(9)
        break

      default:
        setSizeValue(3)
    }
  }, [size])

  return (
    <img
      alt={username}
      className="inline-block rounded-full"
      src={src}
      style={{ width: `${sizeValue}rem`, height: `${sizeValue}rem` }}
      {...rest}
    />
  )
}
