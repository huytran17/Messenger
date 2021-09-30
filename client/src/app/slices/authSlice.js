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
    const user = await axios.get(`${Server.URL}:${Server.PORT}/users/user`);

    return user;
  }
);

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH,
  initialState,
  reducers: {
    loggedStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { loggedStatus } = authSlice.actions;

export const selectStatus = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
