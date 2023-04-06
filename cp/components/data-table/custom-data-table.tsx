import { dataTableParamsState } from '@/store/common'
import { HourglassDisabledOutlined } from '@mui/icons-material'
import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { ReactNode, useEffect, useId } from 'react'
import { useRecoilState } from 'recoil'
import { EnhancedTableHead } from './enhanced-table-head'

/**
 * `ICustomDataTableProps` is an object that has the following properties:
 * @property {ReactNode} children - The content of the table.
 * @property {ReactNode} actionHeadProps - This is the props for the action header.
 * @property headCells - An array of objects that will be used to render the table header.
 * @property {boolean} isFirstLoading - This is a boolean that determines whether the table is loading or not.
 * @property {string} maxHeight - The maximum height of the table.
 * @property {number} colSpanEmpty - The number of columns that will be displayed when the table is empty.
 * @property {number} totalPage - Total number of pages
 */
type ICustomDataTableProps = {
  children?: ReactNode
  actionHeadProps?: ReactNode
  headCells?: Array<any>
  isFirstLoading?: boolean
  maxHeight?: string
  colSpanEmpty?: number
  totalPage?: number
}

export const CustomDataTable = (props: ICustomDataTableProps) => {
  /* Destructuring the props. */
  const {
    children,
    actionHeadProps,
    maxHeight = 'calc(100vh - 196px)',
    headCells = [],
    colSpanEmpty = 7,
    totalPage = 0,
    isFirstLoading,
  } = props

  // Recoil state
  const [dataTableParams, setDataTableParams] = useRecoilState(dataTableParamsState)

  // reset dataTableParamas
  useEffect(() => {
    setTimeout(() => {
      setDataTableParams({
        refetchData: 0,
        rowsPerPage: 20,
        page: 1,
        orderColumn: 'id',
        orderDir: 'desc',
      })
    }, 500)
  }, [])


  /* A hook that generates a unique id for the table. */
  const tableId = useId()

  /**
   * A function that is called when the user changes the page in the table.
   * @param {unknown} event - unknown - this is the event that is triggered when the page is changed.
   * @param {number} newPage - The page number that the user clicked on.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setDataTableParams?.({
      ...dataTableParams,
      page: newPage + 1,
    })
  }

  /**
   * It sets the rows per page to the value of the input.
   * @param event - React.ChangeEvent<HTMLInputElement>
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataTableParams?.({
      ...dataTableParams,
      rowsPerPage: parseInt(event.target.value),
    })
  }

  return (
    <Box className="custom-data-table-wrapper">
      {/* This for add head toolbar */}
      {actionHeadProps ? (
        <Stack direction={'row'} sx={{ width: '100%' }}>
          {actionHeadProps}
        </Stack>
      ) : null}

      <Divider className="divider-table" />

      {/* Rendering the table body. */}
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader aria-labelledby={tableId}>
          <EnhancedTableHead headCells={headCells} />
          <TableBody>
            <>
              {totalPage > 0 ? (
                <>{children}</>
              ) : (
                <TableRow className="no-data-found">
                  <TableCell colSpan={colSpanEmpty} align="center">
                    <Stack justifyContent={'center'} height={200}>
                      <Box>
                        <HourglassDisabledOutlined fontSize="large" sx={{ color: grey[500] }} />
                      </Box>
                      <Typography color={grey[600]}>No data found</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>

      {/* TablePagination  */}
      {!isFirstLoading && totalPage > 0 ? (
        <TablePagination
          rowsPerPageOptions={[5, 20, 50, 100, 400]}
          component="div"
          count={totalPage}
          rowsPerPage={dataTableParams.rowsPerPage}
          page={dataTableParams.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page："
        />
      ) : null}
    </Box>
  )
}
