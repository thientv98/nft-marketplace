import { loadingState } from '@/components/loading/store'
import endpoint from '@/config/endpoint.json'
import { IApiResponse } from '@/types'
import { axiosClient } from '@/utils'
import { setRecoil } from 'recoil-nexus'
import { itemState } from './store'

/**
 * It fetches the user list from the API and sets the userState with the response
 * @param {any} params - The parameters that will be sent to the API.
 * @param {any} enqueueSnackbar - This is a function that is used to display a snackbar.
 * @returns An object with a key of "users" and a value of an array of objects.
 */
export const getDataApi = (params: any, enqueueSnackbar: any) => {
  setRecoil(loadingState, true)
  return axiosClient
    .get(endpoint.orderList, { params })
    .then((res: IApiResponse | any) => {
      if (res.code === 200) {
        setRecoil(itemState, {
          total: res.data.total,
          items: res.data.orders,
        })
      } else {
        enqueueSnackbar(res.message, { variant: 'error' })
      }
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    })
    .finally(() => {
      setRecoil(loadingState, false)
    })
}
