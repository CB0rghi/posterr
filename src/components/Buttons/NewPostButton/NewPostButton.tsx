import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from 'src/constants'
import CustomButton from '../CustomButton/CustomButton'

export default function NewPostButton() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(Routes.POSTS_NEW)
  }

  return (
    <CustomButton
      text="New Post"
      onClick={handleClick}
    />
  )
}
