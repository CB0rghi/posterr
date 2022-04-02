import React from 'react'
import { Prop, Post as PostType } from 'src/types'
import { TestIds } from 'src/constants'
import PostTypeLabel from '../PostTypeLabel/PostTypeLabel'
import Avatar from '../Avatar/Avatar'
import PostHeader from './Header/PostHeader'
import PostFooter from './Footer/PostFooter'

type PostProps = Prop & {
  post: PostType
}
export default function Post(props: PostProps) {
  const {
    post,
    ...rest
  } = props

  const {
    author,
    createdAt,
    text
  } = post

  const {
    id: authorId,
    picturePath,
    username,
    name
  } = author

  return (
    <article
      className="
        p-4 border-2 border-black
        rounded-md my-2 mx-auto
        hover:bg-slate-200
        flex
      "
      {...rest}
    >
      <div className="flex-none mr-4">
        <Avatar
          data-testid={TestIds.Author.PICTURE}
          src={picturePath}
          username={username}
        />
      </div>
      <div className="w-full">
        <PostTypeLabel
          className="w-full"
          data-testid={TestIds.Post.TYPE}
          post={post}
        />
        <PostHeader
          userId={authorId}
          name={name}
          username={username}
          createdAt={createdAt}
        />
        <p
          data-testid={TestIds.Post.TEXT}
          className="py-2 text-base width-auto text-black flex-shrink"
        >
          {text}
        </p>
        <PostFooter
          data-testid={TestIds.Post.ACTIONS}
          post={post}
        />
      </div>
    </article>
  )
}
