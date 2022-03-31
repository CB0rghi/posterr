type BaseResponse<T> = {
  data?: T
  message: string
  success: boolean
}

export const errorResponse = (message: string): BaseResponse<any> => ({
  message,
  success: false
})

export const successResponse = <T>(data: T, message: string): BaseResponse<T> => ({
  data,
  message,
  success: true
})

export default BaseResponse
