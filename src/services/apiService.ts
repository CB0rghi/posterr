import { Post } from 'src/types'
import axios from 'axios'
import { Routes } from 'src/constants'

interface Api {
  getPosts: () => Promise<Post[]>
}

const baseApi = 'http://localhost:3001/'

const api: Api = {
  getPosts: async () => {
    const response = await axios.get(`${baseApi}${Routes.POSTS}?_sort=date&_order=desc`)
    const { data, status } = response
    if (status === 200) { return data as Post[] }
    return []
  }
}

export default api
