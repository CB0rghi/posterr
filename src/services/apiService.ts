import { Post } from 'src/types'
import axios from 'axios'
import { Routes } from 'src/constants'

interface Api {
  getPosts: () => Promise<Post[]>
  getPostsByAuthorIds: (ids: number[]) => Promise<Post[]>
}

const baseApi = 'http://localhost:3001/'

const orderByDateDesc = '_sort=timestamp&_order=desc'
const api: Api = {
  getPosts: async () => {
    const response = await axios.get(`${baseApi}${Routes.POSTS}?${orderByDateDesc}`)
    const { data, status } = response
    if (status === 200) { return data as Post[] }
    return []
  },
  getPostsByAuthorIds: async (ids: number[]) => {
    const response = await axios.get(`${baseApi}${Routes.POSTS}?author.id_like=[${ids.toString()}]&${orderByDateDesc}`)
    const { data, status } = response
    if (status === 200) return data as Post[]
    return []
  }
}

export default api
