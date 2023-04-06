import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import UserContainer from '@/plugins/user/components'
import { breadcrumbsState } from '@/store/common'
import { trans } from '@/utils'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export default function PortReportPage() {
  // Hooks
  const setBreadcrumbs = useSetRecoilState(breadcrumbsState)

  // Handle set breadcrumb on header
  useEffect(() => {
    setBreadcrumbs([
      { name: 'Home', to: '/' },
      { name: trans('user'), to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])
  return (
    <>
      <HeadPage title={trans('user')} />
      <UserContainer />
    </>
  )
}

PortReportPage.Layout = MainLayout
