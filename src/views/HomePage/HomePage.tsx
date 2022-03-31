import React, { useEffect, useState } from 'react'
import { Loader, PostsFilter, Feed } from 'src/components'
import { useFeedStore } from 'src/stores'
import { useLocation } from 'react-router-dom'
import { PostType } from 'src/modules'
import { Texts } from 'src/constants'

function HomePage() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const {
    setFilter
  } = useFeedStore((store) => ({
    setFilter: store.setFilter
  }))

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { pathname } = location
      const isFollowing = PostType.isFollowing(pathname)
      if (isFollowing) {
        setFilter(Texts.FOLLOWING)
      } else {
        setFilter(Texts.ALL)
      }
      setLoading(false)
    }
    init()
  }, [])

  const render = () => {
    if (loading) return <Loader />
    return (
      <div>
        <PostsFilter />
        <Feed />
      </div>
    )
  }

  return render()
}

export default HomePage
