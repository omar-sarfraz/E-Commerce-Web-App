import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const samsungProductSlice = createSlice({
    name: 'samsungProduct',
    initialState,
    reducers: {
        putSamsungProducts: (state, action) => {
            state.value = action.payload
        }
    },
})

const { actions, reducer } = samsungProductSlice

export const { putSamsungProducts } = actions

export default reducer