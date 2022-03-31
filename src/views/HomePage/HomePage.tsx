import React, { useEffect } from 'react'
import { PostsFilter, Feed } from 'src/components'
import { useFeedStore } from 'src/stores'
import { Outlet, useLocation } from 'react-router-dom'
import { PostType } from 'src/modules'
import { Texts } from 'src/constants'

function HomePage() {
  const location = useLocation()
  const {
    setFilter
  } = useFeedStore((store) => ({
    setFilter: store.setFilter
  }))

  useEffect(() => {
    const init = async () => {
      const { pathname } = location
      const showAllPosts = PostType.isAll(pathname)
      const showFollowingPosts = PostType.isFollowing(pathname)
      if (showFollowingPosts) {
        setFilter(Texts.FOLLOWING)
      }

      if (showAllPosts) {
        setFilter(Texts.ALL)
      }
    }
    init()
  }, [])

  const render = () => (
    <div>
      <PostsFilter />
      <Feed />
      <Outlet />
    </div>
  )

  return render()
}

export default HomePage
