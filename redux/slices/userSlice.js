import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    setAddress: (state, action) => {
      state.value.address = action.payload;
    },
  },
});

const { actions, reducer } = user;

export const { setUser, setAddress } = actions;

export default reducer;
