import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

type ButtonProps = {
  handleClick?: (e: any) => void
}


export const IconButtonEdit = (props: ButtonProps) => {
  const { handleClick } = props
  return (
    <IconButton onClick={handleClick}>
      <Edit />
    </IconButton>
  )
}
