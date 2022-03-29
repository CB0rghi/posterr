import create from 'zustand'

interface UserState {
  id?: string
  setId: (value: string) => void
}

const initialState = {
  id: undefined
}

const userStore = create<UserState>(
  (set) => (
    {
      ...initialState,
      setId: (value: string) => set((state: UserState) => ({ ...state, id: value }))
    }
  )
)

export default userStore
