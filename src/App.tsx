import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './views/HomePage/HomePage'
import UserProfile from './views/UserProfile/UserProfile'
import { Routes as CustomRoutes } from './constants'
import { Loader } from './components'

function App() {
  return (
    <main
      data-testid="app"
      className="p-5"
    >
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="users/:userId" element={<UserProfile />} />
        </Route>
        <Route path={CustomRoutes.ALL} element={<HomePage />} />
        <Route path={CustomRoutes.FOLLOWING} element={<HomePage />} />
      </Routes>
      <Loader />
    </main>
  )
}

export default App
