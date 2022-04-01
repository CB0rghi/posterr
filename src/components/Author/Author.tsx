import React from 'react'
import { TestIds } from 'src/constants'
import { User } from 'src/types'
import Prop from 'src/types/prop'
import Avatar from 'src/components/Avatar/Avatar'
import { Link } from 'react-router-dom'

type AuthorProps = Prop & User

export default function Author(props: AuthorProps) {
  const {
    id, username, picturePath, name, ...rest
  } = props

  return (
    <div className="flex items-start" {...rest}>
      <Avatar
        data-testid={TestIds.Author.PICTURE}
        src={picturePath}
        username={username}
      />
      <span className="font-semibold mx-2">{name}</span>
      <Link
        className="text-sm text-dark leading-5 transition ease-in-out duration-100"
        to={`/users/${id}`}
      >
        {username}
      </Link>
    </div>
  )
}
