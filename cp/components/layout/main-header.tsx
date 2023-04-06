import { breadcrumbsState, openSidebarState } from '@/store/common'
import { BreadcrumbType } from '@/types'
import { Logout } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { setRecoil } from 'recoil-nexus'
import { Avatar } from '../avatar'
import { logoutApi } from './api'
export const MainHeader = () => {
  // Hooks
  const [anchorAccountMenuEl, setAnchorAccountMenuEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorAccountMenuEl)
  const router = useRouter()
  const breadcrumbs = useRecoilValue(breadcrumbsState)

  // Handle click show account menu
  const handleClickAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccountMenuEl(event.currentTarget)
  }

  // Handle close menu
  const handleClose = () => {
    setAnchorAccountMenuEl(null)
  }

  // Last breadcrumb
  const isLastBreadcrumb = (id: number) => {
    return id === breadcrumbs.length - 1
  }

  /**
   * It calls the logoutApi function, which is imported from the api.ts file, and passes the router
   * object as an argument
   */
  const handleLogout = () => {
    logoutApi(router)
  }

  // Mobile sidebar
  const handleOpeSideBar = () => {
    setRecoil(openSidebarState, true)
  }

  return (
    <>
      <AppBar id="pr-main-header" position="fixed" elevation={0} className="main-header-wrapper">
        <Toolbar>
          <Box className="main-header-wrapper--btn-menu">
            <IconButton size="small" edge="start" onClick={handleOpeSideBar}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Left side  */}
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
            {breadcrumbs.map((item: BreadcrumbType, i: number) => (
              <Button
                key={i}
                disabled={isLastBreadcrumb(i)}
                size="small"
                onClick={() => router.push(item.to)}
              >
                {item.name}
              </Button>
            ))}
          </Breadcrumbs>
          {/* end::Left side  */}

          {/* start::Right side  */}
          <Box
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickAccountMenu}
          >
            <Avatar />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile menu  */}
      <Menu
        anchorEl={anchorAccountMenuEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          className: 'account-menu',
        }}
      >
        <Box width={{ xs: '180px', md: '200px' }}>
          {/* <MenuItem>
            <Person />
            <Typography className="menu-label">Profile</Typography>
          </MenuItem>
          <MenuItem>
            <Settings />
            <Typography className="menu-label">Settings</Typography>
          </MenuItem> */}
          {/* <MenuItem>
            <Translate />
            <Stack direction={'row'} spacing={2} alignItems="center">
              <Typography className="menu-label">Language</Typography>
              <Chip
                size="small"
                sx={{ borderRadius: '4px' }}
                avatar={<Box>1</Box>}
                label="English"
              />
            </Stack>
          </MenuItem> */}
          {/* <Divider /> */}
          <MenuItem onClick={handleLogout}>
            <Logout />
            <Typography className="menu-label">Logout</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </>
  )
}
