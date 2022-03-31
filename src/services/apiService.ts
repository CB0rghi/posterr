import { BaseResponse } from 'src/types'
import axios from 'axios'
import { Messages } from 'src/constants'
import { mockThrottle, validateResponse } from 'src/modules/api'

interface Api {
  get: <TResponse>(route: string) => Promise<BaseResponse<TResponse>>
  patch: <TRequest, TResponse>(route: string, body: TRequest) => Promise<BaseResponse<TResponse>>
  post: <TRequest, TResponse>(route: string, body: TRequest) => Promise<BaseResponse<TResponse>>
}

const baseApi = 'http://localhost:3001/' // This would come from .env file

const api: Api = {
  get: async <T>(route: string) => {
    await mockThrottle()
    const axiosResponse = await axios.get(`${baseApi}${route}`)
    return validateResponse<T>(axiosResponse, Messages.ERROR_GETTING_ROUTE(route))
  },
  patch: async <TRequest, TResponse>(route: string, body: TRequest) => {
    const axiosResponse = await axios.patch(`${baseApi}${route}`, body)
    return validateResponse<TResponse>(axiosResponse, Messages.ERROR_UPDATING(route))
  },
  post: async <TRequest, TResponse>(route: string, body: TRequest) => {
    const axiosResponse = await axios.post(`${baseApi}${route}`, body)
    return validateResponse<TResponse>(axiosResponse, Messages.ERROR_UPDATING(route))
  }
}

export default api
