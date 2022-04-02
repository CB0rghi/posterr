import React from 'react'
import Switch from 'react-switch'
import { TestIds, Texts } from 'src/constants'
import { useNavigate } from 'react-router-dom'
import { PostsFilter as PostsFilterType, Prop } from 'src/types'
import { usePostsStore } from 'src/stores'

export default function PostsFilter({ className }: Prop) {
  const { filter, setFilter } = usePostsStore(
    (store) => (
      {
        filter: store.filter,
        setFilter: store.setFilter
      }
    )
  )
  const navigate = useNavigate()

  const switchFilter = (newValue: PostsFilterType) => {
    setFilter(newValue)
    navigate(`/${newValue.toLowerCase()}`)
  }

  const handleChange = (isFollowing: boolean) => {
    if (isFollowing) {
      switchFilter('Following')
    } else {
      switchFilter('All')
    }
  }

  const isFollowing = filter === Texts.FOLLOWING

  return (
    <div data-testid={TestIds.Post.FILTER_SWITCH} className={`flex items-center ${className}`}>
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
