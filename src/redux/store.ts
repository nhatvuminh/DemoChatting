import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'

// @ts-ignore
const store = configureStore({
  reducer: rootReducer,
})
export default store

export type RootState = ReturnType<typeof store.getState> // A global type to access reducers types
export type AppDispatch = typeof store.dispatch
