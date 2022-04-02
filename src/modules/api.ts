import { AxiosResponse } from 'axios'
import { Messages } from 'src/constants'
import { BaseResponse } from 'src/types'
import { errorResponse, successResponse } from 'src/types/baseResponse'

export const waitFor = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const throtlleMilliseconds = 0
// TODO: Add time to mock throtlle
export const mockThrottle = async () => waitFor(throtlleMilliseconds)

export const logError = (message: string) => {
  // Suggestion: Log errors on external service (Like ElasticSearch)
  // eslint-disable-next-line no-console
  console.error(message)
}

export const requestFailed = (status: number) => status < 200 || status > 299

export const validateResponse = <T>(
  response: AxiosResponse,
  errorMessage: string
): BaseResponse<T> => {
  const { data, status } = response
  const hasRequestFailed = requestFailed(status)
  if (hasRequestFailed) {
    logError(Messages.REQUEST_FAILED(status, data))
    return errorResponse(errorMessage)
  }

  return successResponse(data, Messages.SUCESSFUL_REQUEST)
}
