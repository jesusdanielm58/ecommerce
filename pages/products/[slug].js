import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import data from '../../utils/data'
import Layout from '../../components/Layout'
import Link from 'next/link'
import UseStyles from '../../utils/styles'
import { Button, Card, Grid, List, ListItem, Typography, Link as MaterialLink } from '@mui/material'
import Image from 'next/image'
import Store from '../../utils/Store'
const products = () => {
  const router = useRouter()
  const context = useContext(Store)
  const { slug } = router.query
  const product = data.find((x) => x.slug === slug)
  const addToCartHandler = () => {
    context.commit({ type: 'addToCart', payload: product })
    router.push('/cart')
  }
  if (product) {
    return (
      <Layout title={product.name} description={product.description}>
        <div style={UseStyles.section}>

          <Link href='/' passHref>
            <MaterialLink>
              <Typography>volver a inicio</Typography>
            </MaterialLink>

          </Link>

        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image src={product.image} alt={product.name} width={640} height={640} layout='responsive' />

          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem> <Typography component='h1' variant='h1'>{product.name}</Typography></ListItem>
              <ListItem> <Typography>Category: {product.category}</Typography></ListItem>
              <ListItem> <Typography>Brand: {product.brand}</Typography></ListItem>
              <ListItem> <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
              <ListItem><Typography>Description: {product.description}</Typography> </ListItem>
            </List>

          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{product.countInStock === 0 ? 'Unaviable' : 'in Stock'}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              <ListItem>
                <Button fullWidth variant='contained' color='primary' onClick={addToCartHandler}>
                  Add to cart
                </Button>
              </ListItem>
            </Card>

          </Grid>

        </Grid>

      </Layout>
    )
  } else {
    return <div>not found</div>
  }
}

export default products
