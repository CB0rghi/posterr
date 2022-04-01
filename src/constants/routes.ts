import Texts from './texts'

const FOLLOWING = `/${Texts.FOLLOWING}`
const ALL = `/${Texts.ALL}`
const HOME = '/'
const POSTS = 'posts'
const POSTS_NEW = '/posts/new'
const USERS = 'users'
const USERS_ID = (id = ':userId') => `/users/${id}`

export default {
  ALL,
  FOLLOWING,
  HOME,
  POSTS,
  POSTS_NEW,
  USERS,
  USERS_ID
}
