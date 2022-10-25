import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const cartOpen = createSlice({
  name: "cartOpen",
  initialState,
  reducers: {
    setCartOpen: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = cartOpen;

export const { setCartOpen } = actions;

export default reducer;
