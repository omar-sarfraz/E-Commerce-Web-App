import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const headphonesSlice = createSlice({
  name: "headphone",
  initialState,
  reducers: {
    putHeadphoneProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = headphonesSlice;

export const { putHeadphoneProducts } = actions;

export default reducer;
