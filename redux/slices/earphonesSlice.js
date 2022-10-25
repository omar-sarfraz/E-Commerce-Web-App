import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const earphonesSlice = createSlice({
  name: "earphone",
  initialState,
  reducers: {
    putEarphoneProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = earphonesSlice;

export const { putEarphoneProducts } = actions;

export default reducer;
