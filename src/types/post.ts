import PostType from './postType'
import User from './user'

type Post = {
  author: User
  id: string
  timestamp: number
  text: string
  type: PostType
  repostedBy?: User
  quoted?: Post
}

export default Post
