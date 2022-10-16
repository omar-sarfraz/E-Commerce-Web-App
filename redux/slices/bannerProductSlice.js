import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const bannerProductSlice = createSlice({
    name: 'bannerProduct',
    initialState,
    reducers: {
        putBannerProducts: (state, action) => {
            state.value = action.payload
        }
    },
})

const { actions, reducer } = bannerProductSlice

export const { putBannerProducts } = actions

export default reducer