import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "../../constants/index";

const initialState = {
  isOpen: false,
  title: "",
  message: "",
};

export const alertSlice = createSlice({
  name: Reducer.NAME.ALERT,
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setAlert: (state, action) => {
      const payload = action.payload;

      state.title = payload.title;

      state.message = payload.message;
    },
  },
});

export const { setOpen, setAlert } = alertSlice.actions;

export const selectOpen = (state) => state.alert.isOpen;

export const selectTitle = (state) => state.alert.title;

export const selectMessage = (state) => state.alert.message;

export default alertSlice.reducer;
