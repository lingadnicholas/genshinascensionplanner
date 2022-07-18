// STORE REDUCERS HERE

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import primoReducer from '../features/primos/primoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    primos: primoReducer,
  },
})
