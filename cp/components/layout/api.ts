import { deleteCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { setRecoil } from 'recoil-nexus'
import { loadingState } from '../loading/store'

/**
 * It removes the accessToken from sessionStorage and the cookie, then redirects to the home page
 * @param {NextRouter | any} router - NextRouter | any
 */
export const logoutApi = (router: NextRouter | any) => {
  setRecoil(loadingState, true)
  sessionStorage.removeItem('accessToken')
  deleteCookie('accessToken')

  setTimeout(() => {
    router.push('/')
    setRecoil(loadingState, false)
  }, 1000)
}
