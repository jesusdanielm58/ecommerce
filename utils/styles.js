import { grey } from '@mui/material/colors'
const UseStyles = {
  navBar: {
    backgroundColor: '#102030',
    '& a': {
      color: 'white',
      marginLeft: '10px'
    }
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  main: {
    minHeight: '80vh',
    // backgroundColor: grey[50]
  },
  footer: {
    textAlign: 'center'
  },
  grow: {
    flexGrow: 1,
    textAlign: 'right'
  },
  section: {
    margin: '10px  0'
  }
}

export default UseStyles
