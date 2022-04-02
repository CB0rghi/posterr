import {
  User, Post, PostType, BaseResponse,
  Quote, Repost
} from 'src/types'
import { Messages, Routes } from 'src/constants'
import Api from 'src/services/apiService'
import { currentTimestamp } from './date'
import { isOriginal, isQuote, isRepost } from './postType'

export const existsRepost = async (userId: number, postId: string) => {
  const response: BaseResponse<Post[]> = await Api.get(`${Routes.POSTS}?type=REPOST&repost.author.id=${userId}&repost.originalPostId=${postId}`)

  const { data: matchedPosts } = response
  return Boolean(matchedPosts?.length)
}

export const getOriginalPost = (text: string, author: User): Post => ({
  id: '',
  text,
  author,
  type: 'ORIGINAL',
  repostCount: 0,
  quoteCount: 0,
  createdAt: currentTimestamp()
})

export const getQuote = (text: string, original: Post, author: User): Post => ({
  ...original,
  id: '',
  type: 'QUOTE',
  repostCount: original.repostCount,
  quoteCount: original.quoteCount,
  quote: {
    author,
    comment: text,
    createdAt: currentTimestamp(),
    originalPostId: original.id
  }
})

export const getRepost = (original: Post, author: User): Post => ({
  ...original,
  id: '',
  type: 'REPOST',
  repostCount: original.repostCount,
  quoteCount: original.quoteCount,
  repost: {
    author,
    originalPostId: original.id,
    createdAt: currentTimestamp()
  }
})

export const getNewPostObject = (type: PostType, text: string, author: User, post?: Post) => {
  if (isOriginal(type)) {
    return getOriginalPost(text, author)
  }

  if (isQuote(type)) {
    return getQuote(text, post as Post, author)
  }

  if (isRepost(type)) {
    return getRepost(post as Post, author)
  }

  throw Error(Messages.TYPE_NOT_IMPLEMENTED)
}

export const getCreatedAt = (post: Post): number => {
  const {
    createdAt, repost, quote, type
  } = post

  if (isOriginal(type)) { return createdAt }
  if (isRepost(type)) { return (repost as Repost).createdAt }
  if (isQuote(type)) { return (quote as Quote).createdAt }

  throw Error(Messages.TYPE_NOT_IMPLEMENTED)
}

export const getAuthor = (post: Post): User => {
  const {
    repost, quote, author, type
  } = post

  if (isOriginal(type)) { return author }
  if (isRepost(type)) { return (repost as Repost).author }
  if (isQuote(type)) { return (quote as Quote).author }

  throw Error(Messages.TYPE_NOT_IMPLEMENTED)
}
