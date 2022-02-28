import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const Store = createContext('naranja')

export const StoreWrapper = ({ children }) => {
  console.log(Cookies.get('dark'))
  const initialState = {
    darkMode: false,
    cart: [],
    userInfo: null
  }
  useEffect(() => {
    if (Cookies.get('dark') === 'ON') {
      updateState((prev) => { return { ...prev, darkMode: true } })
    }
    if (window.localStorage.getItem('cart')) {
      updateState((prev) => { return { ...prev, cart: JSON.parse(window.localStorage.getItem('cart')) } })
    }
    if (window.localStorage.getItem('userInfo')) {
      updateState((prev) => { return { ...prev, userInfo: JSON.parse(window.localStorage.getItem('userInfo')) } })
    }
    console.log(initialState)
  }, [])
  const [state, updateState] = useState({ ...initialState })
  const commit = ({ type, payload }) => {
    console.log('pasa commit', type)
    if (type === 'darkModeOn') {
      updateState((prev) => { return { ...prev, darkMode: true } })
    } else if (type === 'darkModeOff') {
      updateState((prev) => { return { ...prev, darkMode: false } })
    } else if (type === 'addToCart') {
      updateState((prev) => {
        const exist = prev.cart.findIndex((elem) => elem.name === payload.name)
        let newCart
        if (exist === -1) {
          newCart = [...prev.cart, { ...payload, quantity: 1 }]
        } else {
          newCart = [...prev.cart]
          newCart[exist].quantity += 1
          if (newCart[exist].quantity > newCart[exist].countInStock) {
            newCart[exist].quantity = newCart[exist].countInStock
          }
        }
        Cookies.set('cart', JSON.stringify(newCart))
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        console.log(prev.cart, newCart)
        return { ...prev, cart: newCart }
      })
    } else if (type === 'removeFromCart') {
      updateState((prev) => {
        const newCart = prev.cart.filter((x) => x.name !== payload)
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        return { ...prev, cart: newCart }
      })
    } else if (type === 'updateCartQuantity') {
      updateState((prev) => {
        const newCart = prev.cart.map((x) => {
          if (x.name === payload.name) {
            x.quantity = payload.value
          }
          return x
        })
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        return { ...prev, cart: newCart }
      })
    } else if (type === 'login') {
      updateState((prev) => {
        return { ...prev, userInfo: payload }
      })
    } else if (type === 'logOut') {
      updateState((prev) => {
        return { ...prev, userInfo: null }
      })
    }
  }
  return <Store.Provider value={{ state, commit }}>{children}</Store.Provider>
}

export default Store
