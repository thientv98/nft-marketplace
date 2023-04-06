import { openSidebarState } from '@/store/common'
import { trans } from '@/utils'
import {
  Article,
  BurstMode,
  ChevronRight,
  Comment,
  CreateNewFolder,
  Curtains,
  Dashboard,
  ExpandMore,
  LibraryBooks,
  Notifications,
  Person,
  Report,
  Signpost,
} from '@mui/icons-material'
import { Box, Button, Collapse, Drawer, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { setRecoil } from 'recoil-nexus'
import { MenuSubType, MenuType } from './type'

/* A React component that is used to render the sidebar of the application. */
export const MainSideBar = () => {
  // State
  const [activeId, setActiveId] = useState('')

  // Recoil
  const isSidebarOpen = useRecoilValue(openSidebarState)

  // Hooks
  const router = useRouter()

  const menus: MenuType | any = [
    {
      id: 'dashboard',
      label: trans('dashboard'),
      to: '/',
      icon: <Dashboard />,
    },
    {
      id: 'user',
      label: trans('user'),
      to: '/user',
      icon: <Person />,
    },
    {
      id: 'item',
      label: trans('item'),
      to: '/items',
      icon: <BurstMode />,
    },
    {
      id: 'order',
      label: 'Order',
      to: '/order',
      icon: <Signpost />,
    },

    // {
    //   id: 'footer',
    //   label: trans('footer'),
    //   to: '/footer',
    //   icon: <LibraryBooks />,
    // },
  ]

  /**
   * It sets the activeId state to the id of the menu item that was clicked, and then it pushes the path
   * of the menu item that was clicked to the router
   * @param [type=main] - The type of the menu, which is used to determine whether the menu is a main
   * menu or a submenu.
   * @param {string} id - The id of the menu item
   * @param {string} path - The path of the page to be routed to.
   */
  const handleRouter = (type = 'main', id: string, path: string) => {
    if (type == 'main') {
      setActiveId(id)
      router.push(path)
    } else if (type == 'sub') {
      router.push(path)
    }
  }

  /**
   * If the id passed in is the same as the activeId, then set the activeId to an empty string, otherwise
   * set the activeId to the id passed in
   * @param {string} id - The id of the submenu
   */
  const handleExpandSub = (id: string) => {
    setActiveId(id == activeId ? '' : id)
  }

  /**
   * It sets the value of the `openSidebarState` to `false`
   */
  const handleCloseSidebar = () => {
    setRecoil(openSidebarState, false)
  }

  /* Watching the path and setting the activeId to the parentId of the submenu item. */
  useEffect(() => {
    const path = router.asPath

    menus.forEach((item: MenuType) => {
      const navItem =
        item?.submenu &&
        item?.submenu?.length > 0 &&
        item.submenu.find((i: MenuSubType) => i.to === path)
      if (navItem) {
        setActiveId(navItem.parentId)
      }
    })
  }, [router])

  const SideBarChild = (
    <Box id="pr-app-sidebar" className="side-bar-wrapper">
      {/* begin::Logo */}
      <Box className="side-bar-wrapper--logo">NFT Community</Box>
      {/* end::logo  */}
      {/* begin::sidebar menu */}
      <Box className="app-sidebar-menu">
        {/* <!--begin::Menu--> */}
        <Stack spacing={0.5}>
          {menus.map((menu: MenuType, index: number) => (
            <React.Fragment key={index}>
              <Button
                className={
                  router.asPath === menu.to || router.asPath === menu.to + '/' + router.query.id
                    ? 'btn-light-primary'
                    : 'btn-base'
                }
                onClick={() => {
                  if (menu?.submenu && menu?.submenu?.length > 0) {
                    handleExpandSub(menu.id)
                  } else {
                    handleRouter('main', menu.id, menu.to)
                  }
                }}
                startIcon={menu.icon}
                endIcon={
                  menu?.submenu && menu.submenu?.length > 0 ? (
                    activeId == menu?.id ? (
                      <ExpandMore />
                    ) : (
                      <ChevronRight />
                    )
                  ) : null
                }
              >
                <span className="btn-label">{menu.label}</span>
              </Button>

              <Collapse in={menu?.submenu && menu?.submenu?.length > 0 && activeId == menu?.id}>
                <Stack pl={1}>
                  {menu.submenu?.map((item, i) => (
                    <Button
                      key={i}
                      startIcon={item.icon}
                      className={router.asPath === item.to ? 'btn-light-primary' : 'btn-base'}
                      onClick={() => handleRouter('sub', item.id, item.to)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </Collapse>
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Box>
  )

  return (
    <>
      {/* Web show  */}
      <Box display={{ xs: 'none', lg: 'flex' }}>{SideBarChild}</Box>

      {/* mobile show  */}
      <Drawer anchor={'left'} open={isSidebarOpen} onClose={handleCloseSidebar}>
        {SideBarChild}
      </Drawer>
    </>
  )
}
