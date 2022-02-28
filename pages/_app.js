import '../styles/globals.css'
import { StoreWrapper } from '../utils/Store'
import { SnackbarProvider } from 'notistack'

function MyApp ({ Component, pageProps }) {
  return (
    <StoreWrapper>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </StoreWrapper>
  )
}

export default MyApp
