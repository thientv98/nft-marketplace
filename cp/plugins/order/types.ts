import { ItemType } from "../item/types"

export type OrderType = {
  _id: string
  price: string
  state: string
  deadline: string
  seller: string
  purchaser: string
  itemContract: ItemType
  from: string
  to: string
  nowIn: string
  createdAt: string
  updatedAt: string
}
