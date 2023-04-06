import { atom } from 'recoil'

/* Creating a state object that can be used in the app. */
export const dashboardState = atom({
  key: 'dashboard',
  default: null,
})
