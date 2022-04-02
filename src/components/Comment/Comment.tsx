import React, { useState } from 'react'
import Modal from 'src/components/Modal/Modal'
import { Messages, Texts } from 'src/constants'
import { isOriginal, isQuote } from 'src/modules/postType'
import {
  useLayoutStore,
  usePostsStore,
  useUserStore
} from 'src/stores'
import { Post, PostType, User } from 'src/types'
import CustomButton from '../Buttons/CustomButton/CustomButton'
import CustomTextarea from '../Form/CustomTextarea'

type CommentProps = {
  onClose: () => void
  post?: Post
  placeholder: string
  title: string
  type: PostType
}

export default function Comment({
  onClose,
  placeholder,
  post,
  title,
  type
}: CommentProps) {
  const [text, setText] = useState('')

  const { isLoading, startLoading, stopLoading } = useLayoutStore((store) => ({
    isLoading: store.isLoading,
    startLoading: store.startLoading,
    stopLoading: store.stopLoading
  }))

  const { create, quote } = usePostsStore(
    (store) => ({
      create: store.create,
      quote: store.quote
    })
  )

  const { loggedUser } = useUserStore((store) => ({
    loggedUser: store.loggedUser as User
  }))

  const createPost = async () => {
    startLoading(Messages.CREATING_ITEM(Texts.NEW_POST))
    if (isOriginal(type)) {
      await create(text, loggedUser)
    } else if (isQuote(type)) {
      await quote(text, post as Post, loggedUser)
    }
    stopLoading()
    onClose()
  }

  const disabled = (isLoading || !text.length)

  return (
    <Modal title={title} onClose={onClose}>
      <CustomTextarea
        placeholder={placeholder}
        text={text}
        setText={setText}
      />
      <div className="w-full flex justify-end">
        <CustomButton
          text="Create"
          onClick={createPost}
          disabled={disabled}
        />
      </div>
    </Modal>
  )
}
