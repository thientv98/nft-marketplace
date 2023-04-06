import { ButtonSubmit, InputField, InputPasswordField } from '@/components'
import { CardAuth } from '@/components/card/auth'
import { loadingState } from '@/components/loading/store'
import { trans } from '@/utils'
import { passwordValidation } from '@/utils/validator'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { CheckboxElement, FormContainer } from 'react-hook-form-mui'
import { useSetRecoilState } from 'recoil'
import { loginApi } from '../api'
import { FormLoginProps } from '../types'

/**
 * We're creating a LoginContainer component that renders a CardAuth component with a FormContainer
 * component that renders a TextFieldElement, PasswordElement, CheckboxElement, and Button component
 * @returns A CardAuth component with a Stack component inside of it.
 */
export const LoginContainer = () => {
  /* Call hooks */
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const setLoading = useSetRecoilState(loadingState)

  /* It's setting the default values of the form. */
  const defaultValues: FormLoginProps = {
    email: '',
    password: '',
    remember: false,
  }

  /**
   * It's setting the accessToken in the cookie or sessionStorage depending on the value of the remember property
   * @param {FormLoginProps} data - FormLoginProps
   */
  const onSubmit = async (data: FormLoginProps) => {
    loginApi(data, router, enqueueSnackbar, setLoading)
  }

  return (
    <CardAuth vector={'ic ic--login'}>
      <Stack width={'100%'}>
        <Typography variant="h5" textAlign="center" fontWeight={500}>
          {trans('loginTitlePage')}
        </Typography>

        <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
          <Stack width={'100%'} spacing={2} paddingTop={4}>
            <InputField
              name="email"
              type="email"
              label={trans('emailLabel')}
              required
              placeholder={trans('emailPlaceholder')}
            />

            <InputPasswordField
              name={'password'}
              label={trans('passwordLabel')}
              placeholder={trans('passwordPlaceholder')}
              required
              validation={passwordValidation()}
            />
          </Stack>

          <Stack
            paddingTop={1}
            paddingBottom={4}
            direction={'row'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <CheckboxElement name={'remember'} label={trans('rememberMe')} />
            <Link href={'/forgot-password'}>{trans('forgotPassword')}</Link>
          </Stack>

          <ButtonSubmit type={'submit'} btnText={trans('login')} />
        </FormContainer>
      </Stack>
    </CardAuth>
  )
}
