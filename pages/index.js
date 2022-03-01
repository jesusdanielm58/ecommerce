import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import data from '../utils/data'
import Link from 'next/link'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Store from '../utils/Store'
import { useRouter } from 'next/router'
import { useContext } from 'react'
export default function Home () {
  const context = useContext(Store)
  const router = useRouter()
  const addToCartHandler = (elem) => {
    context.commit({ type: 'addToCart', payload: elem })
    router.push('/cart')
  }
  return (
    <Layout title='mamazon'>
      <div className={styles.container}>
        <Typography component='h1' variant='h1'>
          Products
        </Typography>
        <Grid container spacing={2}>
          {data.map((elem) => {
            return (
              <Grid item md={4} key={elem.name}>
                <Card sx={{ boxShadow: 3 }}>
                  <Link href={`/products/${elem.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia component='img' image={elem.image} title={elem.name} />
                      <CardContent>
                        <Typography>
                          {elem.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions style={{ paddingLeft: '10px' }}>
                    <Typography>
                      ${elem.price}
                    </Typography>
                    <Button onClick={() => addToCartHandler(elem)} variant='text' size='small' color='primary'>Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>

    </Layout>
  )
}
