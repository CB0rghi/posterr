import { Post } from 'src/types'
import mockUser from './user'

const mockPost: Post = {
  id: 'postId',
  author: mockUser,
  timestamp: 1262332800000,
  text: 'This is a mocked post',
  type: 'ORIGINAL'
}

export default mockPost
