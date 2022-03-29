import User from './user'

type Post = {
  author: User
  text: string
  type: 'ORIGINAL' | 'REPOST' | 'QUOTE'
}

export default Post
