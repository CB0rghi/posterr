import { Texts } from 'src/constants'
import { Api } from 'src/services'
import { Post, User } from 'src/types'
import create from 'zustand'

interface FeedState {
  loadAllPosts: () => Promise<void>
  loadFollowingPosts: (user: User) => Promise<void>
  posts: Post[]

  filter: string
  setFilter: (value: string) => void
}

const initialState = {
  filter: Texts.ALL,
  posts: []
}

const feedStore = create<FeedState>(
  (set) => ({
    ...initialState,
    loadAllPosts: async () => {
      const posts = await Api.getPosts()
      set((state) => ({ ...state, posts }))
    },
    loadFollowingPosts: async (user: User) => {
      const { followingIds } = user
      const posts = await Api.getPostsByAuthorIds(followingIds)
      set((state) => ({ ...state, posts }))
    },
    setFilter: (value: string) => set((state) => ({ ...state, filter: value }))
  })
)

export default feedStore
