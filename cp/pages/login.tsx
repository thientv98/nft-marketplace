import { HeadPage } from '@/components'
import { AuthLayout } from '@/layouts'
import { LoginContainer } from '@/plugins/auth/components/login'
import { trans } from '@/utils'

/**
 * It returns a LoginContainer component
 */
export default function LoginPage() {
  return (
    <>
      <HeadPage title={trans('loginTitlePage')} />
      <LoginContainer />
    </>
  )
}

LoginPage.Layout = AuthLayout
