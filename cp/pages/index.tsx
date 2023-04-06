import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import DashboardContainer from '@/plugins/dashboard/components'
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
      { name: trans('dashboard'), to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])

  return (
    <>
      <HeadPage title={trans('dashboard')} />
      {/* <DashboardContainer /> */}
    </>
  )
}

PortReportPage.Layout = MainLayout
