import { Routes } from 'src/constants'
import { logError } from 'src/modules/api'
import { getCreatedAt } from 'src/modules/post'
import {
  BaseResponse, Post, PostType
} from 'src/types'
import Api from './apiService'

const orderByDateDesc = '_sort=createdAt&_order=desc'
interface PostService {
  create: (post: Post) => Promise<BaseResponse<Post>>
  getRepostCount: (id: string) => Promise<number>
  getPosts: () => Promise<Post[]>
  getPostsByAuthorIds: (ids: number[], type?: PostType) => Promise<Post[]>
  update: (post: Post) => Promise<BaseResponse<Post>>
}

const getById = async (id: string): Promise<Post | undefined> => {
  const getPost = `${Routes.POSTS}/${id}`
  const response: BaseResponse<Post> = await Api.get(getPost)
  return response.data
}

const postService: PostService = {
  create: async (post: Post) => {
    const route = Routes.POSTS
    const response: BaseResponse<Post> = await Api.post(route, post)
    const { message, success } = response
    if (!success) { logError(message) }
    return response
  },
  getRepostCount: async (id: string) => {
    const post = await getById(id)
    if (!post) return 0
    return post.repostCount
  },
  getPosts: async () => {
    const route = `${Routes.POSTS}?${orderByDateDesc}`
    const response: BaseResponse<Post[]> = await Api.get(route)
    const { data, success } = response
    if (!success) return []
    const sortedPosts = (data as Post[]).sort((a, b) => getCreatedAt(b) - getCreatedAt(a))
    return sortedPosts
  },
  getPostsByAuthorIds: async (ids: number[], type?: PostType) => {
    let postsQuery = `${Routes.POSTS}?author.id_like=[${ids.toString()}]&${orderByDateDesc}`
    if (type) {
      postsQuery += `&type=${type}`
    }
    const response: BaseResponse<Post[]> = await Api.get(postsQuery)
    const { data } = response
    return data || []
  },
  update: async (post: Post) => {
    const { id } = post
    const updateRoute = `${Routes.POSTS}/${id}`
    const response: BaseResponse<Post> = await Api.patch(updateRoute, post)
    return response
  }
}

export default postService
