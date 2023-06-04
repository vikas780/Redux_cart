import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './createSlice'
import modalSlice from './Modalslice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalSlice,
  },
})
