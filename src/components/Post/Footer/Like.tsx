import React from 'react'
import { Texts } from 'src/constants'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import FooterAction from './FooterAction'

export default function Like() {
  return (
    <FooterAction
      title={Texts.LIKE}
      icon={faHeart}
      count={0}
      onClick={() => {}}
    />
  )
}
