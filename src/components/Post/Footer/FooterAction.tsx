import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

type FooterActionProps = {
  icon: IconDefinition
  count: number
  onClick: () => void
  title: string
}

export default function FooterAction({
  icon,
  count,
  onClick,
  title
}: FooterActionProps) {
  return (
    <button
      className="flex items-center"
      type="button"
      title={title}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        className="mr-3"
      />
      <p>{count}</p>
    </button>
  )
}
