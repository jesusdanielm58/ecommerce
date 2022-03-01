import { Button, List, ListItem, TextField, Typography, Link as MaterialLink } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import Store from '../utils/Store'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const context = useContext(Store)
  const router = useRouter()
  console.log(router.query)
  useEffect(() => {
    if (context.state.userInfo !== null) {
      router.push('/')
    }
  }, [])
  const submitHandler = async ({ password, email }) => {
    closeSnackbar()
    try {
      console.log(email, password)
      const config = {
        headers: new window.Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        })
      }
      const data = await axios.post('/api/login', { email, password }, config)
      console.log(data)
      context.commit({ type: 'login', payload: data.data })
      window.localStorage.setItem('userInfo', JSON.stringify(data.data))
      router.push('/')
    } catch (e) {
      let message = e
      if (e.response.data) {
        message = e.response.data.message
      }
      enqueueSnackbar(message, { variant: 'error' })
    }
  }
  return (
    <Layout title='login'>
      <form onSubmit={handleSubmit(submitHandler)} style={{ maxWidth: '800px', margin: 'auto' }}>
        <Typography component='h1' variant='h1'>login</Typography>
        <List>
          <ListItem>
            <Controller
              name='email' control={control} defaultValue=''
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='email' label='email'
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'email is not valid'  // eslint-disable-line  
                        : 'email is required'  // eslint-disable-line  
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='password' control={control} defaultValue=''
              rules={{
                required: true,
                minLength: 6
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='password' label='Password' type='password'
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'  // eslint-disable-line  
                        : 'Password is required'  // eslint-disable-line  
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth>login</Button>
          </ListItem>
          <ListItem>
            <Typography>email: jesusmarcano16@gmail.com, password: 12345678</Typography>
          </ListItem>
          <ListItem>
            <Link href='/register' passHref>
              <MaterialLink color='secondary'>Don't have an account?</MaterialLink>
            </Link>
          </ListItem>
        </List>
      </form>

    </Layout>
  )
}

export default login
