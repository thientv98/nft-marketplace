import { atom } from 'recoil'
import { UserType } from './types'

/* Creating a state with the key `filterPost` and the default value is `{title: '', postCategoryId: 0}`. */
export const filterUserState = atom({
  key: 'filterUser',
  default: {
    search: '',
  },
})

/* Creating a state with the key `postListState` and the default value is `[]` */
export const userState = atom({
  key: 'user',
  default: {
    total: 0,
    users: [],
  },
})

/* Creating a state with the key `userActive` and the default value is `null`. */
export const userActiveState = atom<UserType | null>({
  key: 'userActive',
  default: null,
})
