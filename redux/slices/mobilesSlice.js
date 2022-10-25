import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mobilesSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    putMobileProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = mobilesSlice;

export const { putMobileProducts } = actions;

export default reducer;
