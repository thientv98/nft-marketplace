import {
  BasicModal, ButtonCancel, InputField
} from '@/components'
import { openModalDetailState } from '@/store/common'
import { trans } from '@/utils'
import { Avatar, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FormContainer } from 'react-hook-form-mui'
import { useRecoilState } from 'recoil'
import { orderActiveState } from '../store'

export const ModalDetail = () => {
  /* Call hooks */
  const { enqueueSnackbar } = useSnackbar()
  const [openModalDetail, setOpenModalDetail] = useRecoilState(openModalDetailState)
  const [itemActive, setItemActive] = useRecoilState(orderActiveState)

  console.log(itemActive);


  /* Setting the default values of the form. */
  const defaultValues = {
    price: itemActive?.price ?? '',
    state: itemActive?.state ?? '',
    deadline: itemActive?.deadline ?? '',
    seller: itemActive?.seller ?? 0,
    purchaser: itemActive?.purchaser ?? '',
    itemContract: itemActive?.itemContract ?? '',
    from: itemActive?.from ?? '',
    to: itemActive?.to ?? '',
    nowIn: itemActive?.nowIn ?? '',
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
            <InputField
              name={'price'}
              label="Price"
              placeholder="Price"
            />
            <InputField
              name={'state'}
              label="State"
              placeholder="State"
            />
            <InputField
              name={'seller'}
              label="Seller"
              placeholder="Seller"
            />
            <InputField
              name={'purchaser'}
              label='purchaser'
              placeholder='purchaser'
            />
            <InputField
              name={'itemContract._id'}
              label='Item'
              placeholder='Item'
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
