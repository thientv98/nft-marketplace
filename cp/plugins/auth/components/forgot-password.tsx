import { ButtonSubmit, CardAuth, InputField, Loading } from '@/components'
import { trans } from '@/utils'
import { Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { FormContainer } from 'react-hook-form-mui'
import { forgotPasswordApi } from '../api'

/**
 * FormForgotPassword is an object with a property called email that is a string.
 * @property {string} email - string
 */
export type FormForgotPassword = {
  email: string
}

/**
 * It's a function that returns a card with a form that allows the user to reset their password
 * @returns A card with a form that allows the user to reset their password.
 */
export const ForgotPasswordContainer = () => {
  /* Call hooks */
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  /* Setting the default value of the email field to an empty string. */
  const defaultValues: FormForgotPassword = {
    email: '',
  }

  /**
   * A function that will be called when the form is submitted.
   * @param {FormForgotPassword} data - FormForgotPassword
   */
  const onSubmit = (data: FormForgotPassword) => {
    forgotPasswordApi(data, enqueueSnackbar, setLoading)
  }

  return (
    <>
      <CardAuth
        vector={'ic ic--forgot-password'}
        title={trans('forgotPasswordTitle')}
        description={trans('forgotPasswordDescription')}
      >
        <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
          <Stack spacing={4}>
            <InputField name={'email'} label={trans('emailLabel')} required type={'email'} />

            <ButtonSubmit type={'submit'} btnText={trans('forgotPasswordSubmit')} />
          </Stack>
        </FormContainer>
      </CardAuth>

      <Loading open={loading} />
    </>
  )
}
