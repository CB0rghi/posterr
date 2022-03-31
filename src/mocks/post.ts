import { Post } from 'src/types'
import mockUser from './user'

const mockPost: Post = {
  id: 'postId',
  author: mockUser,
  text: 'This is a mocked post',
  type: 'ORIGINAL'
}

export default mockPost
