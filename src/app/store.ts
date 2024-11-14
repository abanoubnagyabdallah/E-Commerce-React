import { configureStore } from '@reduxjs/toolkit'


import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'
// import loginSlice from "./features/LoginSlice"
// ...
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { apiSlice } from './services/apiSlice'
import UserImageSlice from './features/userImageSlice'

const persistCartConfig = {
  key: 'cart',
  storage,
}

const persistCartReducer = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
  reducer: {
    image:UserImageSlice,
    cart: persistCartReducer,
    // login: loginSlice
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
})

export const persister = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

