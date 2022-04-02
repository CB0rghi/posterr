import { Post } from 'src/types'
import mockUser from './user'

const mockedPosts: Post[] = [
  {
    author: mockUser,
    id: 'hashString2',
    repostCount: 0,
    quoteCount: 0,
    createdAt: 1648562400000,
    text: "I could've use Context Api or redux, but I really like zustand for it's simplicity and efficiency",
    type: 'ORIGINAL'
  },
  {
    id: 'hash1',
    author: mockUser,
    repostCount: 0,
    quoteCount: 0,
    createdAt: 1262332800000,
    text: 'First post on posterr',
    type: 'ORIGINAL'
  }
]

export default mockedPosts
