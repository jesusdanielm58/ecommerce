import { Button, List, ListItem, TextField, Typography, Link as MaterialLink } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import Store from '../utils/Store'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const register = () => {
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
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar()
    if (password !== confirmPassword) {
      enqueueSnackbar('password dont mathc', { variant: 'error' })
      return
    }
    try {
      console.log(email, password)
      const config = {
        headers: new window.Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        })
      }
      const data = await axios.post('/api/register', { email, password, name }, config)
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
    <Layout title='register'>
      <form onSubmit={handleSubmit(submitHandler)} style={{ maxWidth: '800px', margin: 'auto' }}>
        <Typography component='h1' variant='h1'>Register</Typography>
        <List>
          <ListItem>
            <Controller
              name='name' control={control} defaultValue=''
              rules={{
                required: true
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='name' label='name'
                  error={Boolean(errors.name)}
                  helperText={
                  errors.name
                    ? 'name is required'
                    : ''
                }
                  {...field}
                />
              )}
            />

            {/* <TextField onChange={(e) => updateName(e.target.value)} fullWidth id='name' label='name' color='secondary' /> */}
          </ListItem>
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
            {/* <TextField onChange={(e) => updatePassword(e.target.value)} type='password' fullWidth id='password' label='password' color='secondary' /> */}
          </ListItem>
          <ListItem>
            <Controller
              name='confirmPassword' control={control} defaultValue=''
              rules={{
                required: true,
                minLength: 6
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined' fullWidth id='confirmPassword' label='confirmPassword' type='password'
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Password length is more than 5'  // eslint-disable-line  
                        : 'confirm password is required'  // eslint-disable-line  
                      : ''
                  }
                  {...field}
                />
              )}
            />
            {/* <TextField onChange={(e) => updateConfirmPassword(e.target.value)} type='password' fullWidth id='confirmPassword' label='confirmPassword' color='secondary' /> */}
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth>Register</Button>
          </ListItem>
          <ListItem>
            <Link href='/login' passHref>
              <MaterialLink color='secondary'>Already have an account?</MaterialLink>
            </Link>
          </ListItem>
        </List>
      </form>

    </Layout>
  )
}

export default register
