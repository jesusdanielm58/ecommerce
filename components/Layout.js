import React, { useContext } from 'react'
import Head from 'next/head'
import { Container, Typography, CssBaseline } from '@mui/material'
import useStyles from '../utils/styles'
import { createTheme } from '@mui/material/styles'
import Navbar from './Navbar'

import Store from '../utils/Store'

import { ThemeProvider } from '@emotion/react'

const Layout = ({ title, children, description }) => {
  const context = useContext(Store)
  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto',
      h1: {
        fontSize: '1.6rem',
        fontWeight: '400',
        margin: '1rem 0'
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: '400',
        margin: '1rem 0'
      }

    },
    palette: {
      mode: context.state.darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000'

      },
      secondary: {
        main: '#208080'
      }

    }
  })

  return (
    <div>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container sx={useStyles.main}>
          {children}
        </Container>
        <footer>
          <Typography sx={useStyles.footer}>todos los derechos reservados mamazon</Typography>
        </footer>
      </ThemeProvider>
    </div>

  )
}

export default Layout
