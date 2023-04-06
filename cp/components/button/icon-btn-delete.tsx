import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

/**
 * IIconButtonDeleteProps is an object with a handleClick property that is a function that takes an
 * event and returns void.
 * @property handleClick - This is the function that will be called when the button is clicked.
 */
type IIconButtonDeleteProps = {
  handleClick?: (e: any) => void
}

export const IconButtonDelete = (props: IIconButtonDeleteProps) => {
  // Props
  const { handleClick } = props
  return (
    <IconButton onClick={handleClick}>
      <Delete />
    </IconButton>
  )
}
