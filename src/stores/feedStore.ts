import { Stores, Texts } from 'src/constants'
import Services from 'src/services'
import { Post, User } from 'src/types'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface FeedState {
  posts: Post[]
  loadAllPosts: () => Promise<void>
  loadFollowingPosts: (user: User) => Promise<void>

  filter: string
  setFilter: (value: string) => void
}

const initialState = {
  filter: Texts.ALL,
  posts: []
}

const feedStore = create(
  persist<FeedState>(
    (set) => ({
      ...initialState,
      loadAllPosts: async () => {
        const posts = await Services.Post.getPosts()
        set((state) => ({ ...state, posts }))
      },
      loadFollowingPosts: async (user: User) => {
        const { followingIds } = user
        const posts = await Services.Post.getPostsByAuthorIds(followingIds)
        set((state) => ({ ...state, posts }))
      },
      setFilter: (value: string) => set((state) => ({ ...state, filter: value }))
    }),
    {
      name: Stores.FEED
    }
  )
)

export default feedStore
