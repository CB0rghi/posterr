import { Post, Profile, User } from 'src/types'
import create from 'zustand'
import Services from 'src/services'

interface ProfileState extends Profile {
  addFollower: (userId: number) => void
  removeFollower: (userId: number) => void
  setPosts: (posts: Post[]) => void
  setUser: (user: User) => void
  loadProfile: (id: number) => Promise<void>
}

const initialState: Profile = {
  postIds: [],
  user: {
    id: 0,
    name: '',
    username: '',
    joinedAt: '',
    followerIds: [],
    followingIds: [],
    picturePath: ''
  }
}

const profileStore = create<ProfileState>(
  (set, get) => ({
    ...initialState,
    addFollower: (userId: number) => {
      const store = get()
      const { followerIds } = store.user
      const newFollowerIds = [...followerIds, userId]
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          followerIds: newFollowerIds
        }
      }))
    },
    removeFollower: (userId: number) => {
      const store = get()
      const { followerIds } = store.user
      const newFollowerIds = followerIds.filter((id) => id !== userId)
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          followerIds: newFollowerIds
        }
      }))
    },
    setFollowing: (following: number) => set((state) => ({ ...state, following })),
    setJoinedAt: (joinedAt: Date) => set((state) => ({ ...state, joinedAt })),
    setPosts: (posts: Post[]) => set((state) => ({ ...state, posts })),
    setUsername: (username: string) => set((state) => ({ ...state, username })),
    loadProfile: async (id: number) => {
      const user = await Services.User.getById(id)
      set((state) => ({ ...state, user }))
      const posts = await Services.Post.getPostsByAuthorIds([id], 'ORIGINAL')
      const ids = posts.map((post) => post.id)
      set((state) => ({ ...state, postIds: ids }))
    },
    setUser: (user: User) => set((state) => ({ ...state, user }))
  })
)

export default profileStore
