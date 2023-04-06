import { HeadPage } from '@/components'
import { MainLayout } from '@/layouts'
import CommentDetailContainer from '@/plugins/comment/components/detail'
import { breadcrumbsState } from '@/store/common'
import { padNumber, trans } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export default function CommentDetailPage() {

  // Hooks
  const router = useRouter()
  const setBreadcrumbs = useSetRecoilState(breadcrumbsState)

  // Handle set breadcrumb on header
  useEffect(() => {
    setBreadcrumbs([
      { name: 'Home', to: '/' },
      { name: trans('comment'), to: '/comment' },
      { name: padNumber(parseInt(router.query?.id as string ?? 0)), to: '/' },
    ])

    // Clear up function
    return () => {
      setBreadcrumbs([])
    }
  }, [])

  return (
    <>
      <HeadPage title={trans('comment')} />
      <CommentDetailContainer />
    </>
  )
}

CommentDetailPage.Layout = MainLayout
