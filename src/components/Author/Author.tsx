import React from 'react'
import { TestIds } from 'src/constants'
import { User } from 'src/types'
import Prop from 'src/types/prop'
import Avatar from 'src/components/Avatar/Avatar'
import { Link } from 'react-router-dom'

type AuthorProps = Prop & User

export default function Author(props: AuthorProps) {
  const {
    id, username, picturePath, ...rest
  } = props

  return (
    <div className="flex items-center" {...rest}>
      <Avatar
        data-testid={TestIds.Author.PICTURE}
        src={picturePath}
        username={username}
      />
      <Link
        className="ml-3 text-md leading-5 font-medium transition ease-in-out duration-100"
        to={`/users/${id}`}
      >
        {username}
      </Link>
    </div>
  )
}
