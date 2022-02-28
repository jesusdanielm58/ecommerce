import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Stepper, Step, StepLabel, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Button, Link as MaterialLink, Card, List, ListItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Store from '../utils/Store'
const placeorder = () => {
  const context = useContext(Store)
  const itemsPrice = context.state.cart.reduce((a, c) => a + c.quantity, 0)
  const shippingPrice = itemsPrice < 200 ? 0 : 15
  const taxPrice = itemsPrice * 0.15
  const totalPrice = itemsPrice + shippingPrice + taxPrice
  const placeOrderHandler = () => {
    // validaciones guardar a la base de datos borrar carro etc etc
    console.log('pasa')
  }
  return (
    <Layout title='place order'>
      <Stepper activeStep={3} alternativeLabel style={{ margin: '20px 0' }}>
        {['login', 'shipping addres', 'payment method', 'place order'].map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <Typography component='h1' variant='h1'>
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card style={{ margin: '10px  0' }}>
            <List>
              <ListItem>
                <Typography component='h1' variant='h1'>
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  sample text of the shipping address tal tal blalahoakshdlkhsldkh lakshdlkhj aoihsldkhflsh lshdlkhslh
                </Typography>
              </ListItem>
            </List>
          </Card>
          <Card style={{ margin: '10px  0' }}>
            <List>
              <ListItem>
                <Typography component='h1' variant='h1'>
                  Payment method
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  paypal u otro
                </Typography>
              </ListItem>
            </List>
          </Card>

          <Card style={{ margin: '10px  0' }}>
            <List>
              <ListItem>
                <Typography component='h1' variant='h1'>
                  Order elements
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>image</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>price</TableCell>
                        <TableCell>quantity</TableCell>
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
                              <Typography>{elem.quantity}</Typography>
                            </TableCell>

                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </ListItem>
            </List>

          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card style={{ margin: '10px  0' }}>
            <List>
              <ListItem>
                <Typography variant='h2'>
                  Order Summary
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>items</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>tax</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>shipping</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography><strong>total</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>${totalPrice}</strong></Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button onClick={() => placeOrderHandler()} variant='contained' color='primary' fullWidth>
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default placeorder
