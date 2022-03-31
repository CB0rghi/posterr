type User = {
  id: number
  name: string
  username: string
  joinedAt: string
  followerIds: number[]
  followingIds: number[]
  picturePath: string
}

export default User
