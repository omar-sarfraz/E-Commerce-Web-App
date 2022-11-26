import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = products;

export const { setProducts } = actions;

export default reducer;
