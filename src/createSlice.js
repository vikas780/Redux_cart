import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const resp = await axios(url)
    return resp.data
  } catch (error) {
    return error.response
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const remId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== remId)
    },
    increase: (state, action) => {
      const incId = action.payload
      const singleItem = state.cartItems.find((item) => item.id === incId)
      singleItem.amount = singleItem.amount + 1
    },

    decrease: (state, action) => {
      const decId = action.payload

      const singleItem = state.cartItems.find((item) => item.id === decId)
      singleItem.amount = singleItem.amount - 1
    },
    total: (state) => {
      let amt = 0
      let sum = 0
      state.cartItems.forEach((item) => {
        amt += item.amount
        sum += item.amount * item.price
      })
      state.amount = amt
      state.total = sum
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, total } =
  cartSlice.actions
export default cartSlice.reducer
