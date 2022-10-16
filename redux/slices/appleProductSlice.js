import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const appleProductSlice = createSlice({
    name: 'appleProduct',
    initialState,
    reducers: {
        putAppleProducts: (state, action) => {
            state.value = action.payload
        }
    },
})

const { actions, reducer } = appleProductSlice

export const { putAppleProducts } = actions

export default reducer