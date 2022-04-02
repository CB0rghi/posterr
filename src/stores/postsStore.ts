import { toast } from 'react-toastify'
import { Messages, Stores, Texts } from 'src/constants'
import { logError } from 'src/modules/api'
import {
  existsRepost, getOriginalPost, getQuote, getRepost
} from 'src/modules/post'
import { isQuote, isRepost } from 'src/modules/postType'
import { Post, User } from 'src/types'
import create, { SetState } from 'zustand'
import Services from 'src/services'
import { persist } from 'zustand/middleware'

type PostsFilter = 'All' | 'Following'

interface PostsState {
  create: (text: string, author: User) => Promise<void>
  loadAllPosts: () => Promise<void>
  loadFollowingPosts: (user: User) => Promise<void>

  posts: Post[]
  feedPosts: Post[]
  filter: PostsFilter
  setFilter: (value: PostsFilter) => void

  quote: (comment: string, post: Post, author: User) => Promise<void>
  repost: (post: Post, user: User) => Promise<void>
  update: (post: Post) => void
}

const initialState = {
  filter: 'All' as PostsFilter,
  feedPosts: [],
  posts: []
}

const replacePost = (post: Post, posts: Post[]): Post[] => (
  posts.filter((x) => (x.id === post.id ? post : x))
)

const persistUpdateAndUpdateFeed = async (
  type: string,
  postId: string,
  store: PostsState,
  set: SetState<PostsState>
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

const persistPost = async (
  store: PostsState,
  set: SetState<PostsState>,
  newPost: Post,
  message: string
) => {
  const response = await Services.Post.create(newPost)
  const { data: createdPost, message: errorMessage, success } = response
  if (success) {
    const updatedPosts = [createdPost as Post, ...store.posts]
    set((state) => ({ ...state, posts: updatedPosts }))
    toast.success(message)
    return true
  }
  toast.error(errorMessage)
  return false
}

const postsStore = create(persist<PostsState>(
  (set, get) => ({
    ...initialState,
    create: async (text: string, author: User) => {
      const store = get()
      const newPost = getOriginalPost(text, author)
      await persistPost(
        store,
        set,
        newPost,
        Messages.CREATED(Texts.NEW_POST)
      )
    },
    loadAllPosts: async () => {
      const posts = await Services.Post.getPosts()
      set((state) => ({ ...state, posts, feedPosts: posts }))
    },
    loadFollowingPosts: async (user: User) => {
      const { followingIds } = user
      const posts = await Services.Post.getPostsByAuthorIds(followingIds, 'ORIGINAL')
      set((state) => ({ ...state, feedPosts: posts }))
    },
    setFilter: (value: PostsFilter) => set((state) => ({ ...state, filter: value })),
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
      await persistPost(
        store,
        set,
        newRepost,
        Messages.REPOSTED
      )
    },
    quote: async (comment: string, post: Post, author: User) => {
      const store = get()
      const updatedPost = await persistUpdateAndUpdateFeed('QUOTE', post.id, store, set)
      if (!updatedPost) return
      const newPost = getQuote(comment, updatedPost, author)
      await persistPost(store, set, newPost, Messages.QUOTED)
    },
    update: (post: Post) => {
      const { posts: currentPosts } = get()
      const updatedPosts = currentPosts.filter(
        (x) => (x.id === post.id ? post : x)
      )
      set((state) => ({ ...state, posts: updatedPosts }))
    }
  }),
  {
    name: Stores.POSTS
  }
))

export default postsStore
