import { Api } from 'src/services'
import { Post } from 'src/types'
import create from 'zustand'

interface FeedState {
  posts: Post[]
  loadAllPosts: () => Promise<void>
}

const initialState = {
  posts: []
}

const feedStore = create<FeedState>(
  (set) => ({
    ...initialState,
    loadAllPosts: async () => {
      const posts = await Api.getPosts()
      set((state: FeedState) => ({ ...state, posts }))
    }
  })
)

export default feedStore
