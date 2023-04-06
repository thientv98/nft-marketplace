import { dataTableParamsState } from '@/store/common'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { useRecoilState } from 'recoil'

interface IEnhancedTableHead {
  headCells?: Array<any>
}

export const EnhancedTableHead = ({ headCells = [] }: IEnhancedTableHead) => {
  // Recoil state
  const [dataTableParams, setDataTableParams] = useRecoilState(dataTableParamsState)

  // Handle click sort
  const handleChangeSort = (headCell: any) => {
    const { id, disableSort } = headCell
    if (disableSort) return false
    if (dataTableParams.orderColumn == id) {
      setDataTableParams({
        ...dataTableParams,
        orderDir: dataTableParams.orderDir === 'asc' ? 'desc' : 'asc',
      })
    } else {
      setDataTableParams({
        ...dataTableParams,
        orderColumn: id,
        orderDir: 'desc',
      })
    }
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={i}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            colSpan={headCell?.colSpan}
            width={headCell.width}
          >
            <TableSortLabel
              active={headCell.id == dataTableParams.orderColumn ? true : false}
              hideSortIcon={headCell.disableSort ? true : false}
              direction={dataTableParams.orderDir as 'asc' | 'desc'}
              onClick={() => handleChangeSort(headCell)}
              sx={{ cursor: headCell.disableSort ? 'default' : 'pointer' }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
