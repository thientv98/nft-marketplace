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
import { filterOrderState, orderActiveState, orderState } from '../store'
import { OrderType } from '../types'
import { ModalDetail } from './modal-detail'
import { ModalSearch } from './modal-search'

export default function OrderContainer() {
  // Call hooks
  const { enqueueSnackbar } = useSnackbar()
  const setOpenModalSearch = useSetRecoilState(openModalSearchState)
  const dataTableParams = useRecoilValue(dataTableParamsState)
  const filter = useRecoilValue(filterOrderState)
  const dataResponse = useRecoilValue(orderState)
  const setItemActive = useSetRecoilState(orderActiveState)
  const setOpenModalDetail = useSetRecoilState(openModalDetailState)

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    getDataApi({ ...dataTableParams, ...filter }, enqueueSnackbar)
  }, [dataTableParams, filter])

  const covertStep = (step: number) => {
    if (step === 0) return 'Placed'
    else if (step === 1) return 'Comfirmed'
    else if (step === 2) return 'Shipping'
    else if (step === 3) return 'Delivered'
    else return 'Canceled'
  }

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
      id: 'seller',
      numeric: false,
      disablePadding: false,
      label: 'Seller',
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
      id: 'purchaser',
      numeric: false,
      disablePadding: false,
      label: 'Purchaser',
      disableSort: false,
    },
    {
      id: 'itemContract',
      numeric: false,
      disablePadding: false,
      label: 'Item Address',
      disableSort: false,
    },
    {
      id: 'state',
      numeric: false,
      disablePadding: false,
      label: 'State',
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
        {dataResponse.orders && dataResponse.orders.length > 0 && dataResponse.orders.map((item: OrderType) => (
          <TableRow
            tabIndex={-1}
            key={item._id}
            onClick={() => {
              setItemActive(item)
              setOpenModalDetail(true)
            }}
          >
            <TableCell>{item._id}</TableCell>
            <TableCell>{item.seller}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.purchaser}</TableCell>
            <TableCell>{item.itemContract?._id}</TableCell>
            <TableCell>{covertStep(item.state)}</TableCell>
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
