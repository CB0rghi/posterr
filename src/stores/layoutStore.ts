import { Stores } from 'src/constants'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface LayoutState {
  isLoading: boolean
  loaderMessage?: string
  startLoading: (message?: string) => void
  stopLoading: () => void
}

const initialState = {
  isLoading: false,
  loaderMessage: undefined
}

const layoutStore = create(persist<LayoutState>(
  (set) => ({
    ...initialState,
    startLoading: (message?: string) => set(
      (state) => (
        {
          ...state,
          isLoading: true,
          loaderMessage: message
        }
      )
    ),
    stopLoading: () => set((state) => ({ ...state, isLoading: false, loaderMessage: undefined }))
  }),
  {
    name: Stores.LAYOUT
  }
))

export default layoutStore
