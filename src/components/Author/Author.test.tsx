import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestIds } from 'src/constants'
import mockUser from 'src/mocks/user'
import Author from './Author'

const mockedAuthor = mockUser
describe('Author', () => {
  beforeEach(() => render(<Author {...mockedAuthor} />))
  it('renders username', () => {
    const username = screen.getByTestId(TestIds.Author.USERNAME)
    expect(username).toBeInTheDocument()
    expect(username.textContent).toBe(`@${mockedAuthor.username}`)
  })

  it('render picture', () => {
    const picture = screen.getByTestId(TestIds.Author.PICTURE)
    expect(picture).toBeInTheDocument()
  })
})
