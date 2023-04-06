import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { ReactNode } from 'react'

/**
 * `IBasicModalProps` is an object with optional properties `children`, `open`, and `maxWidth`.
 *
 * The `children` property is of type `ReactNode`, which is a type that can be anything that can be
 * rendered by React.
 *
 * The `open` property is of type `boolean`, which is a type that can be either `true` or `false`.
 *
 * The `maxWidth` property is of type `'sm' | 'md' | 'lg'`, which is a type that can be either `'
 * @property {ReactNode} children - The content of the modal.
 * @property {boolean} open - boolean - whether the modal is open or not
 * @property {'sm' | 'md' | 'lg'} maxWidth - The maximum width of the modal.
 */
type IBasicModalProps = {
  children?: ReactNode
  open?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
  title?: string
  onClose?: () => void
}

export const BasicModal = (props: IBasicModalProps) => {
  /* Destructuring the props object. */
  const { children, open = false, maxWidth = 'md', title = '', onClose } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth} sx={{ zIndex: 9999 }}>
      <DialogTitle textAlign={'center'}>{title}</DialogTitle>
      <DialogContent>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  )
}
