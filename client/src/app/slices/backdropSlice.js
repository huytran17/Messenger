import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "../../constants/index";

const initialState = {
  isOpen: true,
};

export const backdropSlice = createSlice({
  name: Reducer.NAME.BACKDROP,
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
      console.log("toggle");
    },
  },
});

export const { toggle } = backdropSlice.actions;

export const selectIsOpen = (state) => state.backdrop.isOpen;

export default backdropSlice.reducer;
