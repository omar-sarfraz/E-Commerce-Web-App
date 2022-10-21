import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        products: [],
        totalPrice: 0,
        totalProducts: 0
    },
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const doProductExist = state.value.products.find(item => item._id === action.payload._id)
            if (doProductExist) {
                state.value.products.forEach((item, index) => {
                    if (item._id === action.payload._id) {
                        state.value.products[index].quantity += action.payload.quantity
                        state.value.totalPrice += action.payload.quantity * action.payload.price
                        return
                    }
                })
            } else {
                state.value.products.push(action.payload)
                state.value.totalPrice += action.payload.quantity * action.payload.price
                state.value.totalProducts += 1
            }
        }
    },
})

const { actions, reducer } = cartSlice

export const { addProduct } = actions

export default reducer