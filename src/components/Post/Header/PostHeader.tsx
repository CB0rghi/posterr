import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from 'src/constants'
import { timeDifference } from 'src/modules/date'

type PostHeaderProps = {
  userId: number
  name: string
  createdAt: number
  username: string
}
export default function PostHeader({
  name,
  username,
  userId,
  createdAt
}: PostHeaderProps) {
  return (
    <div className="flex items-center w-full">
      <Link className="font-semibold" to={Routes.USERS_ID(userId.toString())}>
        {name}
      </Link>
      <p className="text-sm text-gray-800 ml-2">
        {username}
      </p>
      <p className="text-sm text-gray-500 ml-2">{timeDifference(createdAt)}</p>
      <i className="fas fa-angle-down text-dark ml-auto" />
    </div>
  )
}
