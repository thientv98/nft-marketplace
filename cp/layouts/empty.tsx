/**
 * NOTES
 * This empty layout with auth, so you need to login before access this layout, if not logined your navigation will back to login page
 * Url Preview:
 */

import { LayoutProps } from '@/types'
import { Container } from '@mui/system'

export const EmptyLayout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>
}
