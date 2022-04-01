import { toast } from 'react-toastify'
import { Messages, Stores, Texts } from 'src/constants'
import Services from 'src/services'
import {
  BaseResponse, Post, PostType, User
} from 'src/types'
import create, { SetState } from 'zustand'
import { persist } from 'zustand/middleware'

interface FeedState {
  posts: Post[]
  addPost: (text: string, type: PostType, author: User) => Promise<void>,
  repost: (post: Post, user: User) => Promise<void>,
  loadAllPosts: () => Promise<void>
  loadFollowingPosts: (user: User) => Promise<void>

  filter: string
  setFilter: (value: string) => void
}

const initialState = {
  filter: Texts.ALL,
  posts: []
}

const shouldAddPost = (store: FeedState, response: BaseResponse<Post>) => {
  const { success, data } = response
  const { filter } = store
  return success && filter === Texts.ALL && data
}

const addPost = async (
  store: FeedState,
  set: SetState<FeedState>,
  newPost: Post,
  message: string
) => {
  const response = await Services.Post.create(newPost)
  const { data: createdPost } = response
  if (shouldAddPost(store, response)) {
    const updatedPosts = [createdPost as Post, ...store.posts]
    set((state) => ({ ...state, posts: updatedPosts }))
    toast.success(message)
  }
}

const feedStore = create(
  persist<FeedState>(
    (set, get) => ({
      ...initialState,
      addPost: async (text: string, type: PostType, author: User) => {
        const store = get()
        const newPost: Post = {
          id: '',
          text,
          type: 'ORIGINAL',
          author,
          timestamp: new Date().getTime()
        }
        await addPost(store, set, newPost, Messages.REPOSTED)
      },
      repost: async (post: Post, user: User) => {
        const store = get()
        const repostPost: Post = {
          ...post,
          id: '',
          type: 'REPOST',
          repostedBy: user
        }
        await addPost(store, set, repostPost, Messages.CREATED(Texts.NEW_POST))
      },
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
