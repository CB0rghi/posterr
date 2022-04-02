import User from './user'

type Repost = {
  createdAt: number
  author: User
  originalPostId: string
}

export default Repost
