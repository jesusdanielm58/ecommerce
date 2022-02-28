import React, { useContext } from 'react'
import { Link as MaterialLink, Grid, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Select, MenuItem, Button, Card, List, ListItem } from '@mui/material'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import Store from '../utils/Store'
import { useRouter } from 'next/router'

const cart = () => {
  const context = useContext(Store)
  const router = useRouter()
  const selectHandler = (name, value) => {
    context.commit({ type: 'updateCartQuantity', payload: { name, value } })
  }
  const checkOutHandler = () => {
    router.push('/shipping')
  }
  return (
    <Layout title='cart'>
      <Typography component='h1' variant='h1'>
        Cart {context.state.cart.length}
      </Typography>
      {context.state.cart.length === 0
        ? <div>
          <Typography>
            Cart is empty <Link href='/' passHref><MaterialLink>volver al inicio</MaterialLink></Link>
          </Typography>
        </div>  // eslint-disable-line  
        : <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>image</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell>action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {context.state.cart.map((elem) => {
                    return (
                      <TableRow key={elem.name}>
                        <TableCell>
                          <Link href={`/products/${elem.slug}`} passHref>
                            <MaterialLink>
                              <Image src={elem.image} width={50} height={50} alt={elem.name} layout='responsive' />
                            </MaterialLink>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/products/${elem.slug}`} passHref>
                            <MaterialLink color='secondary' underline='none'>
                              <Typography>{elem.name}</Typography>
                            </MaterialLink>
                          </Link>

                        </TableCell>
                        <TableCell>
                          <Typography>{elem.price}</Typography>
                        </TableCell>
                        <TableCell>
                          <Select value={elem.quantity} onChange={(e) => selectHandler(elem.name, e.target.value)}>
                            {[...Array(elem.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}

                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => context.commit({ type: 'removeFromCart', payload: elem.name })} variant='contained' color='secondary'>x</Button>
                        </TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant='h2'>
                    Subtotal ({context.state.cart.reduce((a, c) => a + c.quantity, 0)} items) ${context.state.cart.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button onClick={() => checkOutHandler()} variant='contained' color='primary' fullWidth>
                    check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>}

    </Layout>

  )
}

export default cart
