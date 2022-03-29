import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './views/HomePage/HomePage'
import UserProfile from './views/UserProfile/UserProfile'

function App() {
  return (
    <div
      data-testid="app"
      className="p-5"
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
