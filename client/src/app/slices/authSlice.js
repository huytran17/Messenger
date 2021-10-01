import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Reducer, Server } from "../../constants/index";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const getUserAsync = createAsyncThunk(
  Reducer.NAME.AUTH + "/fetch",
  async () => {
    const user = await axios.get(`${Server.URL}:${Server.PORT}/auth/user`);

    return user.data.data || null;
  }
);

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      if (action.payload) state.isLoggedIn = true;
    });
  },
});

export const { setLoggedStatus } = authSlice.actions;

export const selectLoggedStatus = (state) => state.auth.isLoggedIn;

export const selectLoggedUser = (state) => state.auth.user;

export default authSlice.reducer;
