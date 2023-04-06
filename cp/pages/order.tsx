import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import OrderContainer from '@/plugins/order/components'
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
      { name: 'Order', to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])
  return (
    <>
      <HeadPage title="Order" />
      <OrderContainer />
    </>
  )
}

PortReportPage.Layout = MainLayout
