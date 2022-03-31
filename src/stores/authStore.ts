import { User } from 'src/types'
import mockUser from 'src/mocks/user'
import { persist } from 'zustand/middleware'
import create from 'zustand'
import { Stores } from 'src/constants'

interface AuthState {
  loggedUser: User,
  logout: () => void
}

const initialState = {
  loggedUser: mockUser
}

const authStore = create(
  persist<AuthState>((set) => ({
    ...initialState,
    logout: () => set((state) => ({ ...state, user: null }))
  }), {
    name: Stores.AUTH
  })
)

export default authStore
