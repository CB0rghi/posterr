import { Post } from 'src/types'
import mockUser from './user'

const mockPost: Post = {
  author: mockUser,
  text: 'This is a mocked post',
  type: 'ORIGINAL'
}

export default mockPost
