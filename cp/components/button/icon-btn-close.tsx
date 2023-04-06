import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'

type ButtonProps = {
  className?: string
  handleClick?: (e: any) => void
}


export const IconButtonClose = (props: ButtonProps) => {
  const { handleClick, className } = props
  return (
    <IconButton onClick={handleClick}>
      <Close className={className} />
    </IconButton>
  )
}
