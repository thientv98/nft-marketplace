import {
  BasicModal, ButtonCancel, InputField
} from '@/components'
import { openModalDetailState } from '@/store/common'
import { trans } from '@/utils'
import { Avatar, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FormContainer } from 'react-hook-form-mui'
import { useRecoilState } from 'recoil'
import { userActiveState } from '../store'

export const ModalDetail = () => {
  /* Call hooks */
  const { enqueueSnackbar } = useSnackbar()
  const [openModalDetail, setOpenModalDetail] = useRecoilState(openModalDetailState)
  const [itemActive, setItemActive] = useRecoilState(userActiveState)

  console.log(itemActive);


  /* Setting the default values of the form. */
  const defaultValues = {
    username: itemActive?.username ?? '',
    fullname: itemActive?.fullname ?? '',
    walletAddress: itemActive?.walletAddress ?? '',
    level: itemActive?.level ?? 0,
    vote: itemActive?.vote ?? 0,
    avatar: itemActive?.avatar ?? '',
    phone: itemActive?.phone ?? '',
    websiteLink: itemActive?.websiteLink ?? '',
    facebookLink: itemActive?.facebookLink ?? '',
    twitterLink: itemActive?.twitterLink ?? '',
    pinterestLink: itemActive?.pinterestLink ?? '',
    description: itemActive?.description ?? '',
    instagramLink: itemActive?.instagramLink ?? '',
    youtubeLink: itemActive?.youtubeLink ?? '',
    tiktokLink: itemActive?.tiktokLink ?? '',
    email: itemActive?.email ?? '',
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
            {itemActive?.avatar && <Avatar
              alt={itemActive?.username}
              src={itemActive?.avatar}
              sx={{ width: 100, height: 100, mx: 'auto' }}
            />}

            <InputField
              name={'fullname'}
              label={trans('labelFullName')}
              placeholder={trans('labelFullName')}
            />
            <InputField
              name={'username'}
              label={trans('labelUserName')}
              placeholder={trans('labelUserName')}
            />
            <InputField
              name={'email'}
              label={trans('labelEmail')}
              placeholder={trans('labelEmail')}
            />
            <InputField
              name={'description'}
              rows={2}
              label={trans('labelDescription')}
              placeholder={trans('labelDescription')}
            />
            <InputField
              name={'walletAddress'}
              label={trans('labelWalletAddress')}
              placeholder={trans('labelWalletAddress')}
            />
            <InputField
              name={'level'}
              label={trans('labelLevel')}
              placeholder={trans('labelLevel')}
            />
            <InputField
              name={'vote'}
              label={trans('labelVote')}
              placeholder={trans('labelVote')}
            />
            <InputField
              name={'phone'}
              label={trans('labelPhone')}
              placeholder={trans('labelPhone')}
            />
            <InputField
              name={'websiteLink'}
              label={trans('labelWebsiteLink')}
              placeholder={trans('labelWebsiteLink')}
            />
            <InputField
              name={'facebookLink'}
              label={trans('labelFacebookLink')}
              placeholder={trans('labelFacebookLink')}
            />
            <InputField
              name={'instagramLink'}
              label={trans('labelInstagramLink')}
              placeholder={trans('labelInstagramLink')}
            />
            <InputField
              name={'youtubeLink'}
              label={trans('labelYoutubeLink')}
              placeholder={trans('labelYoutubeLink')}
            />
            <InputField
              name={'tiktokLink'}
              label={trans('labelTiktokLink')}
              placeholder={trans('labelTiktokLink')}
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
