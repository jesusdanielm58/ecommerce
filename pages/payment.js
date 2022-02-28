import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Stepper, Step, StepLabel, Typography, List, ListItem, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

const payment = () => {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [paymentMethod, setPaymentMethod] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    closeSnackbar()
    if (paymentMethod === '') {
      enqueueSnackbar('payment method is required', { variant: 'error' })
    }else{
      router.push('/placeorder')
    }
  }
  return (
    <Layout title='payment'>
      <Stepper activeStep={2} alternativeLabel style={{ margin: '20px 0' }}>
        {['login', 'shipping addres', 'payment method', 'place order'].map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        })}

      </Stepper>
      <form onSubmit={submitHandler} style={{ maxWidth: '800px', margin: 'auto' }}>
        <Typography component='h1' variant='h1'>
          payment
        </Typography>
        <List>
          <ListItem>
            <FormControl component='fieldset'>
              <RadioGroup aria-label='paymentMethod' name='paymentMethod' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel label='paypal' value='paypal' control={<Radio />} />
                <FormControlLabel label='cash' value='cash' control={<Radio />} />
                <FormControlLabel label='stripe' value='stripe' control={<Radio />} />
              </RadioGroup>

            </FormControl>
          </ListItem>
          <ListItem>
            <Button type='submit' variant='contained' fullWidth color='primary'>
              continue
            </Button>
          </ListItem>
          <ListItem>
            <Button variant='contained' color='secondary' fullWidth onClick={() => router.push('/shipping')}>
              back
            </Button>
          </ListItem>
        </List>

      </form>
    </Layout>
  )
}

export default payment
