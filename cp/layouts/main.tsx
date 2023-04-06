import { Loading, MainHeader, MainSideBar } from '@/components'
import { LayoutProps } from '@/types'
import { Box } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * Checking if the accessToken is in the cookie, if not, it is checking if it is in the sessionStorage.
 * If it is not in the sessionStorage, it is redirecting to the login page
 * @param {LayoutProps}  - LayoutProps
 */
export function MainLayout({ children }: LayoutProps) {
  /* A state variable that is used to show the loading component. */
  const [isLogged, setIsLogged] = useState(true)

  /* Getting the router object from the next.js */
  const router = useRouter()

  /* Checking if the accessToken is in the cookie, if not, it is checking if it is in the sessionStorage. */
  let accessToken = getCookie('accessToken')
  if (!accessToken) {
    accessToken = typeof window === 'undefined' ? '' : sessionStorage.getItem('accessToken')
  }

  /* Checking if the accessToken is in the cookie, if not, it is checking if it is in the sessionStorage. */
  useEffect(() => {
    setIsLogged(true)
    if (!accessToken) {
      router.push('/login')
    } else {
      setIsLogged(false)
    }
  }, [accessToken, router])

  return (
    <>
      {isLogged ? (
        <Loading open={isLogged} />
      ) : (
        <Box id="pr-app-root" component={'main'} className="main-layout-wrapper">
          {/* Main Header  */}
          <MainHeader />

          <Box id="pr-app-wrapper" className="app-wrapper">
            {/* Main Side bar */}
            <MainSideBar />

            <Box className="app-main">{children}</Box>
          </Box>
        </Box>
      )}
    </>
  )
}
