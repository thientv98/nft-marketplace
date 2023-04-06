import { BreadcrumbType } from '@/types'
import { atom } from 'recoil'

/* Creating a state with the key `dataTable` and the default value is `{
  refetchData: 0,
  rowsPerPage: 20,
  page: 1,
  orderColumn: '',
  orderDir: '',
}` */
export const dataTableParamsState = atom({
  key: 'dataTableParams',
  default: {
    refetchData: 0,
    rowsPerPage: 20,
    page: 1,
    orderColumn: 'id',
    orderDir: 'desc',
  },
})

/* Creating a state with the key `openModalSearch` and the default value is `false` */
export const openModalSearchState = atom<boolean>({
  key: 'openModalSearch',
  default: false,
})

/* Creating a state with the key `openModalDetail` and the default value is `false` */
export const openModalDetailState = atom<boolean>({
  key: 'openModalDetail',
  default: false,
})

/* Creating a state with the key `openModalDeleteState` and the default value is `false` */
export const openModalDeleteState = atom<boolean>({
  key: 'openModalDelete',
  default: false,
})

/* Creating a state with the key `openModalDenied` and the default value is `false` */
export const openModalDeniedState = atom<boolean>({
  key: 'openModalDenied',
  default: false,
})

export const breadcrumbsState = atom<BreadcrumbType | any>({
  key: 'breadcrumbsState',
  default: [],
})

export const openSidebarState = atom<BreadcrumbType | any>({
  key: 'openSidebarState',
  default: false,
})

/* Creating a state that is a boolean. */
export const isSidebarOpenState = atom({
  key: 'isSidebarOpenState',
  default: false,
})
