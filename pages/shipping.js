import { useRouter } from 'next/router'
import Store from '../utils/Store'
import Layout from '../components/Layout'
import { Button, List, ListItem, TextField, Typography, Link as MaterialLink, Stepper, Step, StepLabel } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const Shipping = () => {
  const context = useContext(Store)
  useEffect(() => {
    if (context.state.userInfo === null) {
      router.push('/login')
    }
  }, [])
  const { control, handleSubmit, formState: { errors } } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const submitHandler = async ({ password, email }) => {
    router.push('/payment')
  }
  return (
    <Layout title='shipping'>
      <Stepper activeStep={1} alternativeLabel style={{margin:'20px 0'}}>
        {['login', 'shipping addres', 'payment method', 'place order'].map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        })}

      </Stepper>
      <form onSubmit={handleSubmit(submitHandler)} style={{ maxWidth: '800px', margin: 'auto' }}>
        <Typography component='h1' variant='h1'>Shipping address</Typography>
        <List>
          <ListItem>
            <Controller
              name='fullName' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='fullName' label='full Name'
                  error={Boolean(errors.fullName)}
                  helperText={
                  errors.fullName
                    ? 'full name is required'
                    : ''
                }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='address' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='address' label='Addres'
                  error={Boolean(errors.address)}
                  helperText={
                  errors.address
                    ? 'Address is required'
                    : ''
                }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='city' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='city' label='City'
                  error={Boolean(errors.city)}
                  helperText={
                  errors.city
                    ? 'City is required'
                    : ''
                }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='postalCode' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='postalCode' label='Postal Code'
                  error={Boolean(errors.postalCode)}
                  helperText={
                  errors.postalCode
                    ? 'Postal code is required'
                    : ''
                }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='country' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='country' label='Country'
                  error={Boolean(errors.country)}
                  helperText={
                  errors.country
                    ? 'Country is required'
                    : ''
                }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant='contained' type='submit' fullWidth>Continue</Button>
          </ListItem>
        </List>
      </form>

    </Layout>
  )
}
export default Shipping
