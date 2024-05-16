// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import shoppingCart from './reducers/shopping-cart.slice'

export const store = configureStore({
  reducer: {
    shoppingCart:shoppingCart
  },

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
