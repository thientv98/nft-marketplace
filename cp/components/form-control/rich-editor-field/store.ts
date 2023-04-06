import { atom } from 'recoil'

/* Creating a state with the key `openModalSelectFile` and the default value is `false` */
export const openModalSelectFileState = atom<boolean>({
  key: 'openModalSelectFile',
  default: false,
})
