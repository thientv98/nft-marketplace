import { loadingState } from '@/components/loading/store'
import endpoint from '@/config/endpoint.json'
import { IApiResponse } from '@/types'
import { axiosClient } from '@/utils'
import { setRecoil } from 'recoil-nexus'
import { dashboardState } from './store'

/**
 * It makes a GET request to the endpoint.dashboard endpoint, and if the response is successful, it
 * sets the dashboardState to the response data
 * @param {any} enqueueSnackbar - This is a function that is used to display a snackbar.
 * @returns An object with a function called getDashboardApi
 */
export const getDashboardApi = (enqueueSnackbar: any) => {
  setRecoil(loadingState, true)
  return axiosClient
    .get(endpoint.dashboard)
    .then((res: IApiResponse | any) => {
      if (res.code === 200) {
        setRecoil(dashboardState, res.data)
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
