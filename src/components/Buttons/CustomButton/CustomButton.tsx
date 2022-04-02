import React, { useState } from 'react'
import { Prop } from 'src/types'

type CustomButtonProps = Prop & {
  disabled?: boolean
  textOnHover?: string
  text: string
  onClick: () => void
}

export default function CustomButton({
  disabled = false,
  onClick,
  text,
  textOnHover
}: CustomButtonProps) {
  const [hovering, setHovering] = useState(false)

  const buttonText = () => {
    if (!textOnHover) return text

    return hovering ? textOnHover : text
  }

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      onBlur={() => setHovering(false)}
      className="
         justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 disabled:opacity-50
      "
      onClick={onClick}
      type="button"
    >
      {buttonText()}
    </button>
  )
}
