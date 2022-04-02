import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Comment } from 'src/components'
import { Messages, Routes, Texts } from 'src/constants'

function NewPost() {
  const navigate = useNavigate()
  const goHome = () => navigate(Routes.HOME)

  return (
    <Comment
      placeholder={Messages.POST_PLACEHOLDER}
      type="ORIGINAL"
      title={Texts.NEW_POST}
      onClose={goHome}
    />
  )
}

export default NewPost
