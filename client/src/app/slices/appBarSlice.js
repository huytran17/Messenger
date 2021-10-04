import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "../../constants/index";

const initialState = {
  openLeft: false,
  openRight: false,
};

export const appBarSlice = createSlice({
  name: Reducer.NAME.APPBAR,
  initialState,
  reducers: {
    toggleStatusLeft: (state) => {
      state.openLeft = !state.openLeft;
    },
    toggleStatusRight: (state) => {
      state.openRight = !state.openRight;
    },
  },
});

export const { toggleStatusLeft, toggleStatusRight } = appBarSlice.actions;

export const selectStatusLeft = (state) => state.appBar.openLeft;

export const selectStatusRight = (state) => state.appBar.openRight;

export default appBarSlice.reducer;
