import { HeadPage } from '@/components'
import { AuthLayout } from '@/layouts'
import { ForgotPasswordContainer } from '@/plugins/auth/components/forgot-password'

export default function ForgotPasswordPage() {
  return (
    <>
      <HeadPage title="Forgot password" />
      <ForgotPasswordContainer />
    </>
  )
}

ForgotPasswordPage.Layout = AuthLayout
