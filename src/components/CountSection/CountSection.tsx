import React from 'react'
import { numberLabel } from 'src/modules/number'
import Prop from 'src/types/prop'

type CountSectionProps = Prop & {
  number: number
  text: string
}

export default function CountSection({ number, text, ...rest }: CountSectionProps) {
  return (
    <div {...rest}>
      <span className="pr-2">{numberLabel(number)}</span>
      <span>{text}</span>
    </div>
  )
}
