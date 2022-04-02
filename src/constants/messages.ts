const ALREADY_REPOSTED = 'Cannot repost twice'
const CHARACTERS_REMAINIG = (count: number | string) => `${count} characters remaining`
const CREATING_ITEM = (item: string) => `Creating ${item.toLowerCase()}`
const CREATED = (item: string) => `Created ${item}`
const ERROR_CREATING = (name: string) => `Error creating ${name}`
const ERROR_GETTING_ROUTE = (route: string) => `Error getting ${route}`
const ERROR_CANT_UNFOLLOW_WITHOUT_LOGIN = 'You must be logged in to unfollow'
const ERROR_UPDATING = (name: string) => `Error updating ${name}`
const LOADING_ITEM = (item: string) => `Loading ${item.toLowerCase()}...`
const LOADER_SUBTITLE = 'This may take a few seconds, please don\'t close this page.'
const JOINED_AT = (date: string) => `Joined at ${date}`
const NO_POSTS_FOUND = 'No posts were found!'
const REPOSTED = 'You got it, reposted!'
const TYPE_NOT_IMPLEMENTED = 'Type does not exists!'
const QUOTED = 'It worked, nice quote :)'
const REQUEST_FAILED = (status: number, data: object) => `Request failed with status ${status}\nError: ${data.toString()}`
const UPDATE_FAILED = (item: string) => `An error occurred while updating ${item}, please contact support!`
const POST_PLACEHOLDER = 'What\'s on your mind?'
const QUOTE_PLACEHOLDER = 'What do you have to say about this?'
const SUCESSFUL_REQUEST = 'Request worked!'

export default {
  ALREADY_REPOSTED,
  CHARACTERS_REMAINIG,
  CREATING_ITEM,
  CREATED,
  ERROR_CANT_UNFOLLOW_WITHOUT_LOGIN,
  ERROR_CREATING,
  ERROR_GETTING_ROUTE,
  ERROR_UPDATING,
  LOADING_ITEM,
  LOADER_SUBTITLE,
  JOINED_AT,
  NO_POSTS_FOUND,
  POST_PLACEHOLDER,
  QUOTE_PLACEHOLDER,
  QUOTED,
  REPOSTED,
  REQUEST_FAILED,
  UPDATE_FAILED,
  SUCESSFUL_REQUEST,
  TYPE_NOT_IMPLEMENTED
}
