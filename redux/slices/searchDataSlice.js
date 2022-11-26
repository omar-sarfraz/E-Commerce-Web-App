import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const searchData = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = searchData;

export const { setSearchData } = actions;

export default reducer;
