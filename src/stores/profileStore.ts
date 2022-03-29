import { Post, Profile } from 'src/types'
import create from 'zustand'

interface ProfileState extends Profile {
  setFollowers: (followers: number) => void
  setFollowing: (following: number) => void
  setJoinedAt: (joinedAt: Date) => void
  setPosts: (posts: Post[]) => void
  setUsername: (username: string) => void
}

const initialState: Profile = {
  joinedAt: undefined,
  followers: 0,
  following: 0,
  posts: [],
  user: {
    id: '',
    name: '',
    picturePath: '',
    username: ''
  }
}

const profileStore = create<ProfileState>(
  (set) => ({
    ...initialState,
    setFollowers: (followers: number) => set((state: ProfileState) => ({ ...state, followers })),
    setFollowing: (following: number) => set((state: ProfileState) => ({ ...state, following })),
    setJoinedAt: (joinedAt: Date) => set((state: ProfileState) => ({ ...state, joinedAt })),
    setPosts: (posts: Post[]) => set((state: ProfileState) => ({ ...state, posts })),
    setUsername: (username: string) => set((state: ProfileState) => ({ ...state, username }))
  })
)

export default profileStore
