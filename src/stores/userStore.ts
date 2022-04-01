import { Messages, Stores } from 'src/constants'
import mockUser from 'src/mocks/user'
import Services from 'src/services'
import { BaseResponse, User } from 'src/types'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  loggedUser?: User
  logout: () => void
  follow: (userId: number) => Promise<void>
  unfollow: (userId: number) => Promise<void>
}

const initialState = {
  loggedUser: mockUser
}

const validateLoggedUser = (store: UserState) => {
  const { loggedUser } = store
  // TODO: Add error middleware to display toaster
  if (!loggedUser) throw new Error(Messages.ERROR_CANT_UNFOLLOW_WITHOUT_LOGIN)
}

const userStore = create(
  persist<UserState>((set, get) => ({
    ...initialState,
    logout: () => set((state) => ({ ...state, loggedUser: undefined })),
    follow: async (userId: number) => {
      const store = get()
      const { id: loggedUserId } = store.loggedUser as User
      validateLoggedUser(store)
      const response: BaseResponse<User> = await Services.User.follow(loggedUserId, userId)
      const { data, message, success } = response
      if (success) {
        set((state) => ({ ...state, loggedUser: data }))
      } else {
        throw new Error(message)
      }
    },
    unfollow: async (userId: number) => {
      const store = get()
      const { id: loggedUserId } = store.loggedUser as User
      validateLoggedUser(store)

      const response: BaseResponse<User> = await Services.User.unfollow(loggedUserId, userId)
      const { data, message, success } = response
      if (success) {
        set((state) => ({ ...state, loggedUser: data }))
      } else {
        throw new Error(message)
      }
    }
  }), {
    name: Stores.USER
  })
)

export default userStore
