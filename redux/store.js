import { configureStore } from '@reduxjs/toolkit'
import appleProductReducer from './slices/appleProductSlice'
import samsungProductReducer from './slices/samsungProductSlice'
import xiaomiProductReducer from './slices/xiaomiProductSlice'
import bannerProductReducer from './slices/bannerProductSlice'

export const store = configureStore({
    reducer: {
        appleProduct: appleProductReducer,
        samsungProduct: samsungProductReducer,
        xiaomiProduct: xiaomiProductReducer,
        bannerProduct: bannerProductReducer,
    },
})