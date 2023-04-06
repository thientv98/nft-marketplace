import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import ItemContainer from '@/plugins/item/components'
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
      { name: trans('items'), to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])
  return (
    <>
      <HeadPage title={trans('item')} />
      <ItemContainer />
    </>
  )
}

PortReportPage.Layout = MainLayout
