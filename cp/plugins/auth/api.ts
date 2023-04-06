import endpoint from '@/config/endpoint.json'
import { IApiResponse } from '@/types'
import { axiosClient } from '@/utils'
import { setCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { SetterOrUpdater } from 'recoil'
import { FormForgotPassword } from './components/forgot-password'
import { FormLoginProps } from './types'

/**
 * It's sending a POST request to the login endpoint with the data from the form, then it's getting the
 * accessToken from the response, then it's setting the accessToken in the cookie or sessionStorage
 * depending on the value of the remember property, then it's showing a snackbar with the message
 * 'Login successfully!' and redirecting the user to the home page
 * @param {FormLoginProps} data - FormLoginProps: It's the data that the user has entered in the form.
 * @param {NextRouter} router - NextRouter
 * @param {any} enqueueSnackbar - It's a function that shows a snackbar.
 * @param setLoading - It's a function that sets the loading state to true or false.
 * @returns It's returning the promise of the axiosClient.post method.
 */
export const loginApi = async (
  data: FormLoginProps,
  router: NextRouter,
  enqueueSnackbar: any,
  setLoading: SetterOrUpdater<boolean>
) => {
  setLoading(true)

  return await axiosClient
    .post(endpoint.login, data)
    .then((res: IApiResponse | any) => {
      if (res.code === 200) {
        /* It's getting the accessToken from the response. */
        const accessToken = res.data.accessToken

        /* It's setting the accessToken in the cookie or sessionStorage depending on the value of the remember property */
        if (data.remember) {
          setCookie('accessToken', accessToken, {
            httpOnly: false,
            sameSite: 'lax',
          })
        } else {
          sessionStorage.setItem('accessToken', accessToken)
        }

        /* It's showing a snackbar with the message 'Login successfully!' and redirecting the user to the home page. */
        enqueueSnackbar('Login successfully!', { variant: 'success' })
        // router.push('/')
        location.href = '/'
      } else {
        enqueueSnackbar(res.message, { variant: 'error' })
      }
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    })
    .finally(() => {
      setLoading(false)
    })
}

export const forgotPasswordApi = async (
  data: FormForgotPassword,
  enqueueSnackbar: any,
  setLoading: SetterOrUpdater<boolean>
) => {
  setLoading(true)
  return await axiosClient
    .post(endpoint.forgotPassword, data)
    .then((res: any) => {
      if (res.code === 200) {
        enqueueSnackbar('Please check your email!', { variant: 'success' })
      } else {
        enqueueSnackbar(res.message, { variant: 'error' })
      }
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    })
    .finally(() => {
      setLoading(false)
    })
}
