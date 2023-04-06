import endpoint from '@/config/endpoint.json'
import { IApiResponse } from '@/types'
import { axiosClientFormData } from '@/utils'

export const uploadFile = (form: FormData, enqueueSnackbar: any) => {
  return axiosClientFormData
    .post(endpoint.uploadImage, form)
    .then((res: IApiResponse | any) => {
      if (res.code === 200) {
        return res.data.imageUrl
      } else {
        enqueueSnackbar(res.message, { variant: 'error' })
      }
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    })
}
