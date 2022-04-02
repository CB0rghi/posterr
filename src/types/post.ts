import PostType from './postType'
import Quote from './quote'
import Repost from './repost'
import User from './user'

type Post = {
  author: User
  id: string
  createdAt: number
  type: PostType
  text: string
  repostCount: number
  quoteCount: number
  repost?: Repost
  quote?: Quote
}

export default Post
