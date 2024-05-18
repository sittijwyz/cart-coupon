// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import shoppingCart from './reducers/shopping-cart.slice'
import coupon from './reducers/coupon.slice'

export const store = configureStore({
  reducer: {
    shoppingCart:shoppingCart,
    coupon:coupon
  },

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
