import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import CommentContainer from '@/plugins/comment/components'
import { breadcrumbsState } from '@/store/common'
import { trans } from '@/utils'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export default function CommentPage() {
  // Hooks
  const setBreadcrumbs = useSetRecoilState(breadcrumbsState)

  // Handle set breadcrumb on header
  useEffect(() => {
    setBreadcrumbs([
      { name: 'Home', to: '/' },
      { name: trans('comment'), to: '' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])

  return (
    <>
      <HeadPage title={trans('comment')} />
      <CommentContainer />
    </>
  )
}

CommentPage.Layout = MainLayout
