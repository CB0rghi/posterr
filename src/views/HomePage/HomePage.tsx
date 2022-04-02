import React, { useEffect } from 'react'
import { PostsFilter, Feed } from 'src/components'
import { usePostsStore } from 'src/stores'
import { Outlet, useLocation } from 'react-router-dom'
import { PostType } from 'src/modules'
import { TestIds, Texts } from 'src/constants'
import NewPostButton from 'src/components/Buttons/NewPostButton/NewPostButton'

function HomePage() {
  const location = useLocation()

  const {
    setFilter
  } = usePostsStore((store) => ({
    setFilter: store.setFilter
  }))

  useEffect(() => {
    const init = async () => {
      const { pathname } = location
      const showAllPosts = PostType.isAll(pathname)
      const showFollowingPosts = PostType.isFollowing(pathname)
      if (showFollowingPosts) {
        setFilter('Following')
      }

      if (showAllPosts) {
        setFilter('All')
      }
    }
    init()
  }, [])

  const render = () => (
    <div className="w-full h-full max-w-xl mx-auto">
      <header className="py-2">
        <h1 data-testid={TestIds.Home.TITLE} className="text-xl font-bold">{Texts.HOME}</h1>
      </header>
      <div className="flex justify-between py-2 w-full">
        <NewPostButton />
        <PostsFilter className="pl-4" />
      </div>

      <Feed data-testid={TestIds.Home.FEED} className="max-w-xl" />
      <Outlet />
    </div>
  )

  return render()
}

export default HomePage
