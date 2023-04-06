import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import CuratorContainer from '@/plugins/curator/components'
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
      { name: trans('curator'), to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])

  return (
    <>
      <HeadPage title={trans('curator')} />
      <CuratorContainer />
    </>
  )
}

PortReportPage.Layout = MainLayout
