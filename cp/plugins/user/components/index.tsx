import {
  ButtonSearch,
  CustomDataTable
} from '@/components'
import {
  dataTableParamsState, openModalDetailState, openModalSearchState
} from '@/store/common'
import { formatMoment, padNumber, trans } from '@/utils'
import { Stack, TableCell, TableRow } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getUsersApi } from '../api'
import { filterUserState, userState } from '../store'
import { UserType } from '../types'
import { ModalDetail } from './modal-detail'
import { ModalSearch } from './modal-search'

export default function UserContainer() {
  // Call hooks
  const { enqueueSnackbar } = useSnackbar()
  const setOpenModalSearch = useSetRecoilState(openModalSearchState)
  const dataTableParams = useRecoilValue(dataTableParamsState)
  const filter = useRecoilValue(filterUserState)
  const dataResponse = useRecoilValue(userState)

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getUsersApi({ ...dataTableParams, ...filter }, enqueueSnackbar)
  }, [dataTableParams, filter])

  // Prepare header cells
  const headCells = [
    {
      id: '_id',
      numeric: false,
      disablePadding: false,
      label: 'Wallet Address',
      disableSort: false,
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: trans('headCellName'),
      disableSort: false,
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: trans('headCellCreatedAt'),
      disableSort: false,
    },
  ]

  return (
    <>
      <CustomDataTable
        headCells={headCells}
        totalPage={dataResponse.total}
        actionHeadProps={
          <Stack direction={'row'} spacing={2}>
            <ButtonSearch
              handleClick={() => setOpenModalSearch(true)}
              btnText={trans('btnSearch')}
            />
          </Stack>
        }
      >
        {dataResponse.users && dataResponse.users.length > 0 && dataResponse.users.map((item: UserType) => (
          <TableRow
            tabIndex={-1}
            key={item._id}
          >
            <TableCell>{item._id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{formatMoment(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </CustomDataTable>

      {/* Modals that are used to edit, delete, and search. */}
      <ModalDetail />
      <ModalSearch />
    </>
  )
}
