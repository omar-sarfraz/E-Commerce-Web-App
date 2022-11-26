import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const filteredData = createSlice({
  name: "filteredData",
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = filteredData;

export const { setFilteredData } = actions;

export default reducer;
