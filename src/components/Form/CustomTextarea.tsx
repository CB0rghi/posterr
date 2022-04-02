import React, { ChangeEvent, useEffect, useState } from 'react'
import { Messages } from 'src/constants'
import { numberLabel } from 'src/modules/number'

const MAX_CHARACTERS = 777

type TextAreaProps = {
  placeholder: string
  setText: (value: string) => void
  text: string
}

export default function CustomTextarea({ placeholder, text, setText }: TextAreaProps) {
  const [remaining, setRemaining] = useState(MAX_CHARACTERS)

  useEffect(() => {
    setRemaining(MAX_CHARACTERS - text.length)
  }, [text])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

  return (
    <>
      <textarea
        onChange={handleChange}
        value={text}
        maxLength={MAX_CHARACTERS}
        placeholder={placeholder}
        className="w-full mt-3 pb-3 focus:outline-none resize-none h-40"
      />
      <span className="text-gray-400 text-right">
        {Messages.CHARACTERS_REMAINIG(numberLabel(remaining))}
      </span>
    </>
  )
}
