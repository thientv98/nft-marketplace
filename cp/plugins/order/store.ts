import { atom } from 'recoil'
import { OrderType } from './types'

export const filterOrderState = atom({
  key: 'filterOrder',
  default: {
    search: '',
  },
})

export const orderState = atom({
  key: 'order',
  default: {
    total: 0,
    orders: [],
  },
})

export const orderActiveState = atom<OrderType | null>({
  key: 'orderActive',
  default: null,
})
