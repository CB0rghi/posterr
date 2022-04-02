import { toast } from 'react-toastify'
import { Messages, Stores, Texts } from 'src/constants'
import { logError } from 'src/modules/api'
import {
  existsRepost,
  getOriginalPost,
  getQuote,
  getRepost
} from 'src/modules/post'
import { isQuote, isRepost } from 'src/modules/postType'
import Services from 'src/services'
import {
  BaseResponse,
  Post,
  User
} from 'src/types'
import create, { SetState } from 'zustand'
import { persist } from 'zustand/middleware'

interface FeedState {
  posts: Post[]
  addPost: (text: string, author: User) => Promise<void>
  repost: (post: Post, user: User) => Promise<void>
  quote: (comment: string, post: Post, author: User) => Promise<void>
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

const persistPostAndUpdateFeed = async (
  store: FeedState,
  set: SetState<FeedState>,
  newPost: Post,
  message: string
) => {
  const response = await Services.Post.create(newPost)
  const { data: createdPost, message: errorMessage } = response
  if (shouldAddPost(store, response)) {
    const updatedPosts = [createdPost as Post, ...store.posts]
    set((state) => ({ ...state, posts: updatedPosts }))
    toast.success(message)
    return true
  }
  toast.error(errorMessage)
  return false
}

const replacePost = (post: Post, posts: Post[]): Post[] => (
  posts.filter((x) => (x.id === post.id ? post : x))
)

const persistUpdateAndUpdateFeed = async (
  type: string,
  postId: string,
  store: FeedState,
  set: SetState<FeedState>
): Promise<Post | undefined> => {
  const { posts } = store
  const post = posts.find(({ id }) => id === postId) as Post
  if (isQuote(type)) {
    post.quoteCount++
  }

  if (isRepost(type)) {
    post.repostCount++
  }

  const { data: updatedPost, message, success } = await Services.Post.update(post)

  if (success) {
    const updatedPosts = replacePost(updatedPost as Post, posts)
    set((state) => ({ ...state, posts: updatedPosts }))
  } else {
    logError(message)
    toast.error(Messages.UPDATE_FAILED(Texts.POST))
  }

  return updatedPost
}

const feedStore = create(
  persist<FeedState>(
    (set, get) => ({
      ...initialState,
      addPost: async (text: string, author: User) => {
        const store = get()
        const newPost = getOriginalPost(text, author)
        await persistPostAndUpdateFeed(
          store,
          set,
          newPost,
          Messages.CREATED(Texts.NEW_POST)
        )
      },
      quote: async (comment: string, post: Post, author: User) => {
        const store = get()
        const updatedPost = await persistUpdateAndUpdateFeed('QUOTE', post.id, store, set)
        if (!updatedPost) return
        const newPost = getQuote(comment, updatedPost, author)
        await persistPostAndUpdateFeed(store, set, newPost, Messages.QUOTED)
      },
      repost: async (post: Post, author: User) => {
        const store = get()

        const isDuplicate = await existsRepost(author.id, post.id)
        if (isDuplicate) {
          toast.error(Messages.ALREADY_REPOSTED)
          return
        }

        const updatedPost = await persistUpdateAndUpdateFeed('REPOST', post.id, store, set)
        if (!updatedPost) return

        const newRepost = getRepost(updatedPost as Post, author)
        await persistPostAndUpdateFeed(
          store,
          set,
          newRepost,
          Messages.REPOSTED
        )
      },
      loadAllPosts: async () => {
        const posts = await Services.Post.getPosts()
        set((state) => ({ ...state, posts }))
      },
      loadFollowingPosts: async (user: User) => {
        const { followingIds } = user
        const posts = await Services.Post.getPostsByAuthorIds(followingIds, 'ORIGINAL')
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
