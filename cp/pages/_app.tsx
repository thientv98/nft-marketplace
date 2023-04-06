import { MainLayout } from '@/layouts'
import { AppPropsWithLayout } from '@/types'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import 'styles/global.scss'

import { GlobalComponent } from '@/components/global'
import { RecoilRoot } from 'recoil'

import { ErrorFallback, Loading } from '@/components'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import RecoilNexus from 'recoil-nexus'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const Layout = Component.Layout ?? MainLayout

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <RecoilRoot>
            <RecoilNexus />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Loading open={true} />}>
                <Layout>
                  <CssBaseline />
                  <Component {...pageProps} />
                  <GlobalComponent />
                </Layout>
              </Suspense>
            </ErrorBoundary>
          </RecoilRoot>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
