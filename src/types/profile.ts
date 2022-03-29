import Post from './post'
import User from './user'

type Profile = {
  joinedAt?: Date
  followers: number
  following: number
  posts: Post []
  user: User
}
export default Profile
