import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from 'src/components'
import Modal from 'src/components/Modal/Modal'
import { Messages, Routes, Texts } from 'src/constants'
import { numberLabel } from 'src/modules/number'
import { useFeedStore, useLayoutStore, useUserStore } from 'src/stores'
import { User } from 'src/types'

const MAX_CHARACTERS = 777

export default function NewPost() {
  const { isLoading, startLoading, stopLoading } = useLayoutStore((store) => ({
    isLoading: store.isLoading,
    startLoading: store.startLoading,
    stopLoading: store.stopLoading
  }))
  const navigate = useNavigate()
  const { addPost } = useFeedStore(
    (store) => ({
      addPost: store.addPost
    })
  )
  const { loggedUser } = useUserStore((store) => ({
    loggedUser: store.loggedUser as User
  }))
  const [text, setText] = useState('')
  const [remaining, setRemaining] = useState(MAX_CHARACTERS)

  useEffect(() => {
    setRemaining(MAX_CHARACTERS - text.length)
  }, [text])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

  const disabled = (isLoading || remaining === MAX_CHARACTERS)

  const createPost = async () => {
    startLoading(Messages.CREATING_ITEM(Texts.NEW_POST))
    await addPost(text, 'ORIGINAL', loggedUser)
    stopLoading()
    navigate(Routes.HOME)
  }

  return (
    <Modal title={Texts.NEW_POST} onClose={() => navigate(Routes.HOME)}>
      <textarea
        onChange={handleChange}
        value={text}
        maxLength={MAX_CHARACTERS}
        placeholder={Messages.POST_PLACEHOLDER}
        className="w-full mt-3 pb-3 focus:outline-none resize-none h-40"
      />
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-right">
          {Messages.CHARACTERS_REMAINIG(numberLabel(remaining))}
        </span>
        <CustomButton
          text="Create"
          onClick={createPost}
          disabled={disabled}
        />
      </div>
    </Modal>
  )
}
