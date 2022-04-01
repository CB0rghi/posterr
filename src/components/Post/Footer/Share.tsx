import React from 'react'
import { Texts } from 'src/constants'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import FooterAction from './FooterAction'

export default function Repost() {
  return (
    <FooterAction
      title={Texts.SHARE}
      icon={faShareSquare}
      count={0}
      onClick={() => {}}
    />
  )
}
