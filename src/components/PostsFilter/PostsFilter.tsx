import React from 'react'
import Switch from 'react-switch'
import { Texts } from 'src/constants'
import { useFeedStore } from 'src/stores'
import { useNavigate } from 'react-router-dom'

export default function PostsFilter() {
  const { filter, setFilter } = useFeedStore(
    (store) => (
      {
        filter: store.filter,
        setFilter: store.setFilter
      }
    )
  )
  const navigate = useNavigate()

  const switchFilter = (newValue: string) => {
    setFilter(newValue)
    navigate(`/${newValue.toLowerCase()}`)
  }

  const handleChange = (isFollowing: boolean) => {
    if (isFollowing) {
      switchFilter(Texts.FOLLOWING)
    } else {
      switchFilter(Texts.ALL)
    }
  }

  const isFollowing = filter === Texts.FOLLOWING

  return (
    <div className="flex items-center">
      <span>{Texts.ALL}</span>
      <Switch
        className="px-5"
        onChange={handleChange}
        checked={isFollowing}
      />
      <span>{Texts.FOLLOWING}</span>
    </div>
  )
}
