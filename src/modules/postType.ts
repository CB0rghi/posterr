import { Texts } from 'src/constants'

const clearString = (string: string) => (string.replace('/', '').toUpperCase().trim())

const isEqual = (a: string, b: string) => {
  const cleanA = clearString(a)
  const cleanB = clearString(b)
  return cleanA === cleanB
}

const isAll = (type: string) => isEqual(type, Texts.ALL)
const isFollowing = (type: string) => isEqual(type, Texts.FOLLOWING)

export const isOriginal = (type: string) => isEqual(type, Texts.ORIGINAL)
export const isRepost = (type: string) => isEqual(type, Texts.REPOST)
export const isQuote = (type: string) => isEqual(type, Texts.QUOTE)

export default {
  isAll,
  isFollowing,
  isRepost
}
