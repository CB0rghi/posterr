import { Texts } from 'src/constants'

const isFollowing = (type: string) => {
  const cleanType = type.replace('/', '').toUpperCase().trim()
  return cleanType === Texts.FOLLOWING.toUpperCase().trim()
}

export default {
  isFollowing
}
