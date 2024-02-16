import { createSlice } from '@reduxjs/toolkit'
import { cartItem } from '../types'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [] }

const addDecimals = (num: number) => {
  return Math.round((num * 100) / 100).toFixed(2)
}

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

      //   calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
      )
      //   calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
      //   calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
      //   calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export default cartSlice.reducer

export const { addToCart } = cartSlice.actions
