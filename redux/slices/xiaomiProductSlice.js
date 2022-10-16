import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const xiaomiProductSlice = createSlice({
    name: 'xiaomiProduct',
    initialState,
    reducers: {
        putXiaomiProducts: (state, action) => {
            state.value = action.payload
        }
    },
})

const { actions, reducer } = xiaomiProductSlice

export const { putXiaomiProducts } = actions

export default reducer