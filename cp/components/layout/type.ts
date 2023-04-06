import { ReactNode } from 'react'

export type MenuType = {
  id: string
  label: string
  to: string
  icon: ReactNode
  submenu: MenuSubType[]
}

export type MenuSubType = {
  id: string
  label: string
  to: string
  icon: ReactNode
  parentId: string
}
