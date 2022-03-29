import React, { useEffect, useState } from 'react'
import Feed from 'src/components/Feed/Feed'
import Loader from 'src/components/Loader/Loader'
import { useFeedStore } from 'src/stores'

function HomePage() {
  const [loading, setLoading] = useState(false)
  const { loadAllPosts } = useFeedStore((store) => ({ loadAllPosts: store.loadAllPosts }))

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await loadAllPosts()
      setLoading(false)
    }
    init()
  }, [])

  const render = () => {
    if (loading) return <Loader />
    return (
      <div>
        <Feed />
      </div>
    )
  }

  return render()
}

export default HomePage
