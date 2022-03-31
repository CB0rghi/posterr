import { Routes } from 'src/constants'
import { BaseResponse, User } from 'src/types'
import Api from './apiService'

interface UserService {
  getById: (id: number) => Promise<User>,
  unfollow: (id: number, userToUnfollowId: number) => Promise<BaseResponse<User>>
}

const getById = async (id: number) => {
  const userById = `${Routes.USERS}/${id}`
  const response = await Api.get(userById)
  const { data } = response
  return data as User
}

const userService: UserService = {
  getById,
  unfollow: async (loggedUserId: number, userToUnfollowId: number) => {
    const user = await getById(loggedUserId)
    user.followingIds = user.followingIds.filter((userId) => userId !== userToUnfollowId)
    const response: BaseResponse<User> = await Api.patch(`${Routes.USERS}/${loggedUserId}`, user)
    return response
  }
}

export default userService
