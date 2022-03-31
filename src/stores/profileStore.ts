import { Post, Profile, User } from 'src/types'
import create from 'zustand'
import Services from 'src/services'
import mockUser from 'src/mocks/user'

interface ProfileState extends Profile {
  setFollowers: (followers: number) => void
  setFollowing: (following: number) => void
  setJoinedAt: (joinedAt: Date) => void
  setPosts: (posts: Post[]) => void
  setUsername: (username: string) => void
  setUser: (user: User) => void
  loadProfile: (id: number) => Promise<void>
}

const initialState: Profile = {
  followers: 0,
  following: 0,
  posts: [],
  user: mockUser
}

const profileStore = create<ProfileState>(
  (set) => ({
    ...initialState,
    setFollowers: (followers: number) => set((state) => ({ ...state, followers })),
    setFollowing: (following: number) => set((state) => ({ ...state, following })),
    setJoinedAt: (joinedAt: Date) => set((state) => ({ ...state, joinedAt })),
    setPosts: (posts: Post[]) => set((state) => ({ ...state, posts })),
    setUsername: (username: string) => set((state) => ({ ...state, username })),
    loadProfile: async (id: number) => {
      const user = await Services.User.getById(id)
      set((state) => ({ ...state, user }))
      const posts = await Services.Post.getPostsByAuthorIds([id])
      set((state) => ({ ...state, posts }))
    },
    setUser: (user: User) => set((state) => ({ ...state, user }))
  })
)

export default profileStore
