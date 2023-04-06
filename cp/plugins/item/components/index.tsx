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
import { getDataApi } from '../api'
import { filterItemState, itemActiveState, itemState } from '../store'
import { ItemType } from '../types'
import { ModalDetail } from './modal-detail'
import { ModalSearch } from './modal-search'

export default function ItemsContainer() {
  // Call hooks
  const { enqueueSnackbar } = useSnackbar()
  const setOpenModalSearch = useSetRecoilState(openModalSearchState)
  const dataTableParams = useRecoilValue(dataTableParamsState)
  const filter = useRecoilValue(filterItemState)
  const dataResponse = useRecoilValue(itemState)
  const setItemActive = useSetRecoilState(itemActiveState)
  const setOpenModalDetail = useSetRecoilState(openModalDetailState)

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getDataApi({ ...dataTableParams, ...filter }, enqueueSnackbar)
  }, [dataTableParams, filter])

  // Prepare header cells
  const headCells = [
    {
      id: '_id',
      numeric: false,
      disablePadding: false,
      label: 'Id',
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
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: trans('price'),
      disableSort: false,
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: false,
      label: 'Owner',
      disableSort: false,
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'Created At',
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
        {dataResponse.items && dataResponse.items.length > 0 && dataResponse.items.map((item: ItemType) => (
          <TableRow
            tabIndex={-1}
            key={item._id}
            onClick={() => {
              setItemActive(item)
              setOpenModalDetail(true)
            }}
          >
            <TableCell>{item._id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.owner}</TableCell>
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
