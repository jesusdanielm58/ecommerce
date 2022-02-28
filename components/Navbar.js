import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, Link as MaterialLink, Switch, Badge, Button, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import Store from '../utils/Store'
import useStyles from '../utils/styles'
import Cookies from 'js-cookie'

const Navbar = () => {
  const context = useContext(Store)
  const { userInfo } = context.state
  const [anchorEl, setAnchorEl] = useState(null)
  const darkModeChangeHandler = () => {
    if (context.state.darkMode) { context.commit({ type: 'darkModeOff' }) } else { context.commit({ type: 'darkModeOn' }) }
    Cookies.set('dark', !context.state.darkMode ? 'ON' : 'OFF')
  }
  const loginClickHandler = (e) => {
    console.log('pasa loginclick handler')
    setAnchorEl(e.currentTarget)
  }
  const loginMenuCloseHandler = () => {
    console.log('pasa login menu close handelr')
    setAnchorEl(null)
  }
  const logoutClickHandler = () => {
    console.log('log out click handler')
    setAnchorEl(null)
    context.commit({ type: 'logOut' })
    window.localStorage.removeItem('userInfo')
  }
  return (
    <AppBar position='static' sx={useStyles.navBar}>
      <Toolbar>
        <Typography>
          <Link href='/' passHref>
            <MaterialLink sx={useStyles.brand}>
              Mamazon
            </MaterialLink>
          </Link>
        </Typography>
        <div style={useStyles.grow}>
          <Switch checked={context.state.darkMode} onChange={darkModeChangeHandler} />
          <Link href='/cart' passHref>
            <MaterialLink>
              {context.state.cart.length > 0
                ? <Badge badgeContent={context.state.cart.length} color='primary'>
                  cart
              </Badge> // eslint-disable-line
                : 'cart'}
            </MaterialLink>
          </Link>
          {context.state.userInfo
            ? <>
              <Button aria-controls='simple-menu' aria-haspopup='true' onClick={loginClickHandler} style={{ textTransform: 'initial', color: 'white' }}>
                {userInfo.name}
              </Button>
              <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={loginMenuCloseHandler}>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>
                  Order Hisotry
                </MenuItem>
                {userInfo.isAdmin && (
                  <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/admin/dashboard')}>
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
              </> // eslint-disable-line
            : <Link href='/login' passHref>
              <MaterialLink>
                login
              </MaterialLink>
            </Link>}
          <Button onClick={() => console.log(context.state)}>state</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
