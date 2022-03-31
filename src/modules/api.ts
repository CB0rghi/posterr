import { AxiosResponse } from 'axios'
import { Messages } from 'src/constants'
import { BaseResponse } from 'src/types'
import { errorResponse, successResponse } from 'src/types/baseResponse'

export const waitFor = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const throtlleMilliseconds = 1000
// TODO: Add time to mock throtlle
export const mockThrottle = async () => waitFor(throtlleMilliseconds)

export const logError = (data: any, status: number) => {
  // Suggestion: Log errors on external service (Like ElasticSearch)
  console.error(`Request failed with status ${status}\nError: ${data.toString()}`)
}

export const requestFailed = (status: number) => status < 200 || status > 299

export const validateResponse = <T>(
  response: AxiosResponse,
  errorMessage: string
): BaseResponse<T> => {
  const { data, status } = response
  const hasRequestFailed = requestFailed(status)
  if (hasRequestFailed) {
    logError(data, status)
    return errorResponse(errorMessage)
  }

  return successResponse(data, Messages.SUCESSFUL_REQUEST)
}
