import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage, NewPost, Profile } from 'src/views'
import { ToastContainer } from 'react-toastify'
import { Routes as CustomRoutes } from './constants'
import { Loader } from './components'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const {
    ALL,
    FOLLOWING,
    HOME,
    POSTS_NEW,
    USERS_ID
  } = CustomRoutes

  return (
    <main
      data-testid="app"
      className="p-5"
    >
      <Routes>
        <Route path={HOME} element={<HomePage />}>
          <Route path={USERS_ID()} element={<Profile />} />
          <Route path={POSTS_NEW} element={<NewPost />} />
        </Route>
        <Route path={ALL} element={<HomePage />} />
        <Route path={FOLLOWING} element={<HomePage />} />
      </Routes>
      <Loader />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  )
}

export default App
