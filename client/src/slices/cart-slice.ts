import { createSlice } from '@reduxjs/toolkit'
import { cartItem } from '../types'
import { updateCart } from '../utils/cart-utils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existingItem = state.cartItems.find(
        (x: cartItem) => x._id === item._id,
      )

      if (existingItem) {
        state.cartItems = state.cartItems.map((x: cartItem) =>
          x._id === existingItem._id ? item : x,
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x: cartItem) => x._id !== action.payload,
      )

      return updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
