import {
  BasicModal, ButtonCancel, InputField
} from '@/components'
import { openModalDetailState } from '@/store/common'
import { trans } from '@/utils'
import { Avatar, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FormContainer } from 'react-hook-form-mui'
import { useRecoilState } from 'recoil'
import { itemActiveState } from '../store'

export const ModalDetail = () => {
  /* Call hooks */
  const { enqueueSnackbar } = useSnackbar()
  const [openModalDetail, setOpenModalDetail] = useRecoilState(openModalDetailState)
  const [itemActive, setItemActive] = useRecoilState(itemActiveState)

  console.log(itemActive);


  /* Setting the default values of the form. */
  const defaultValues = {
    name: itemActive?.name ?? '',
    price: itemActive?.price ?? '',
    owner: itemActive?.owner ?? '',
    order: itemActive?.order ?? 0,
    description: itemActive?.description ?? 0,
    specifications: itemActive?.specifications ?? '',
    externalLink: itemActive?.externalLink ?? '',
    picture: itemActive?.picture ?? '',
    picture_url: itemActive?.picture_url ?? '',
    rawDataHash: itemActive?.rawDataHash ?? '',
    state: itemActive?.state ?? '',
  }

  /**
   * OnClose() is a function that sets the state of the openModalDetail to false and the state of the
   * postActive to null
   */
  const onClose = () => {
    setOpenModalDetail(false)
    setItemActive(null)
  }

  return (
    <BasicModal
      open={openModalDetail}
      title={trans('userTitle')}
      maxWidth="md"
      onClose={onClose}
    >
      <FormContainer defaultValues={defaultValues}>
        <Stack
          paddingTop={2}
          direction={'column'}
          justifyContent="space-between"
          alignContent="space-between"
        >
          <Stack spacing={2}>
            {itemActive?.picture_url && <Avatar
              alt={itemActive?.name}
              src={itemActive?.picture_url}
              sx={{ width: 100, height: 100, mx: 'auto' }}
            />}

            <InputField
              name={'name'}
              label="Name"
              placeholder="Name"
            />
            <InputField
              name={'price'}
              label="Price"
              placeholder="Price"
            />
            <InputField
              name={'owner'}
              label="Owner"
              placeholder="Owner"
            />
            <InputField
              name={'description'}
              rows={2}
              label={trans('labelDescription')}
              placeholder={trans('labelDescription')}
            />
            <InputField
              name={'specifications'}
              label="Specifications"
              placeholder="Specifications"
            />
            <InputField
              name={'externalLink'}
              label="ExternalLink"
              placeholder="ExternalLink"
            />
            <InputField
              name={'rawDataHash'}
              label="RawDataHash"
              placeholder="RawDataHash"
            />
          </Stack>

          <Stack direction={'row'} paddingTop={2} spacing={2} justifyContent="flex-end">
            <ButtonCancel handleClick={() => setOpenModalDetail(false)} btnText={trans('btnCancel')} />
          </Stack>
        </Stack>
      </FormContainer>
    </BasicModal>
  )
}
