import User from './user'

type Post = {
  author: User
  id: string
  text: string
  type: 'ORIGINAL' | 'REPOST' | 'QUOTE'
}

export default Post
