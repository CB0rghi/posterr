import { Routes } from 'src/constants'
import { BaseResponse, User } from 'src/types'
import Api from './apiService'

interface UserService {
  getById: (id: number) => Promise<User>,
  follow: (id: number, userToFollowId: number) => Promise<BaseResponse<User>>
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
  follow: async (loggedUserId: number, userToFollowId: number) => {
    const user = await getById(loggedUserId)
    user.followingIds.push(userToFollowId)
    const response: BaseResponse<User> = await Api.patch(`${Routes.USERS}/${loggedUserId}`, user)
    const { success } = response
    if (success) {
      const followedUser = await getById(userToFollowId)
      followedUser.followerIds.push(loggedUserId)
      await Api.patch(`${Routes.USERS}/${userToFollowId}`, followedUser)
    }
    return response
  },
  unfollow: async (loggedUserId: number, userToUnfollowId: number) => {
    const user = await getById(loggedUserId)
    user.followingIds = user.followingIds.filter((userId) => userId !== userToUnfollowId)
    const response: BaseResponse<User> = await Api.patch(`${Routes.USERS}/${loggedUserId}`, user)
    const { success } = response
    if (success) {
      const unfollowedUser = await getById(userToUnfollowId)
      unfollowedUser.followerIds = unfollowedUser.followerIds.filter(
        (followerId) => followerId !== loggedUserId
      )
      await Api.patch(`${Routes.USERS}/${userToUnfollowId}`, unfollowedUser)
    }
    return response
  }
}

export default userService
