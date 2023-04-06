import { atom } from 'recoil'
import { ItemType } from './types'

export const filterItemState = atom({
  key: 'filterItem',
  default: {
    search: '',
  },
})

export const itemState = atom({
  key: 'item',
  default: {
    total: 0,
    items: [],
  },
})

export const itemActiveState = atom<ItemType | null>({
  key: 'itemActive',
  default: null,
})
