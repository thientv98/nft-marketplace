import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { getDashboardApi } from '../api'
import { dashboardState } from '../store'
import { ItemDashboard } from './item-dashboard'

export default function DashboardContainer() {
  // Call hooks
  const { enqueueSnackbar } = useSnackbar()
  const dataDashboard = useRecoilValue(dashboardState)

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getDashboardApi(enqueueSnackbar)
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        {dataDashboard && Object.keys(dataDashboard).map(key => {
          return (
            <Grid item xs={12} sm={6} md={3} key={key + Date.now()}>
              <ItemDashboard data={{ key: key, value: dataDashboard[key] }} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
