import React from 'react'
import { Texts } from 'src/constants'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import FooterAction from './FooterAction'

export default function Quote() {
  return (
    <FooterAction
      title={Texts.QUOTE}
      icon={faComment}
      count={0}
      onClick={() => {}}
    />
  )
}
