import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds, Texts } from 'src/constants'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { useLayoutStore } from 'src/stores'
import HomePage from './HomePage'

describe('Home Page', () => {
  beforeEach(() => render(<HomePage />, { wrapper: MemoryRouter }))

  beforeAll(() => {
    act(() => {
      useLayoutStore.setState({ isLoading: false })
    })
  })

  it('renders a list of posts', () => {
    const postList = screen.getByTestId(TestIds.Home.FEED)
    expect(postList).toBeInTheDocument()
  })

  it('renders toggle switch', () => {
    const postsSwitch = screen.getByTestId(TestIds.Post.FILTER_SWITCH)
    expect(postsSwitch).toBeInTheDocument()
  })

  it('renders new post button', async () => {
    const newPostButton = screen.getByRole('button', { name: Texts.NEW_POST })
    expect(newPostButton).toBeInTheDocument()
  })

  it('renders title', () => {
    const title = screen.getByTestId(TestIds.Home.TITLE)
    expect(title).toBeInTheDocument()
  })
})
