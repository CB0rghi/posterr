const ERROR_CREATING = (name: string) => `Error creating ${name}`
const ERROR_GETTING_ROUTE = (route: string) => `Error getting ${route}`
const ERROR_UPDATING = (name: string) => `Error updating ${name}`
const LOADING_ITEM = (item: string) => `Loading ${item.toLowerCase()}..`
const LOADER_SUBTITLE = 'This may take a few seconds, please don\'t close this page.'
const JOINED_AT = (date: string) => `Joined at ${date}`
const NO_POSTS_FOUND = 'No posts were found!'
const SUCESSFUL_REQUEST = 'Request worked!'

export default {
  ERROR_CREATING,
  ERROR_GETTING_ROUTE,
  ERROR_UPDATING,
  LOADING_ITEM,
  LOADER_SUBTITLE,
  JOINED_AT,
  NO_POSTS_FOUND,
  SUCESSFUL_REQUEST
}
