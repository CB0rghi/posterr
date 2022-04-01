import { Routes } from 'src/constants'
import { logError } from 'src/modules/api'
import {
  BaseResponse, Post
} from 'src/types'
import Api from './apiService'

const orderByDateDesc = '_sort=timestamp&_order=desc'

interface PostService {
  create: (post: Post) => Promise<BaseResponse<Post>>
  getPosts: () => Promise<Post[]>
  getPostsByAuthorIds: (ids: number[]) => Promise<Post[]>
}

const postService: PostService = {
  create: async (post: Post) => {
    const route = Routes.POSTS
    const response: BaseResponse<Post> = await Api.post(route, post)
    const { message, success } = response
    if (!success) { logError(message) }
    return response
  },
  getPosts: async () => {
    const orderedPosts = `${Routes.POSTS}?${orderByDateDesc}`
    const response: BaseResponse<Post[]> = await Api.get(orderedPosts)
    const { data } = response
    return data || []
  },
  getPostsByAuthorIds: async (ids: number[]) => {
    const orderedPostsByAuthors = `${Routes.POSTS}?author.id_like=[${ids.toString()}]&${orderByDateDesc}`
    const response: BaseResponse<Post[]> = await Api.get(orderedPostsByAuthors)
    const { data } = response
    return data || []
  }
}

export default postService
