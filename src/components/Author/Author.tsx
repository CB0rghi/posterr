import React from 'react'
import { TestIds } from 'src/constants'
import { User } from 'src/types'
import Prop from 'src/types/prop'
import Avatar from 'src/components/Avatar/Avatar'

type AuthorProps = Prop & User

export default function Author(props: AuthorProps) {
  const { username, picturePath, ...rest } = props

  return (
    <div className="flex items-center" {...rest}>
      <Avatar data-testid={TestIds.Author.PICTURE} src={picturePath} username={username} />
      <p
        data-testid={TestIds.Author.USERNAME}
        className="ml-3 text-md leading-5 font-medium transition ease-in-out duration-100"
      >
        @
        {username}
      </p>
    </div>
  )
}
