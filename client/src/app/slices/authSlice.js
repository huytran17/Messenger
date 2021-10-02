import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Reducer, Server } from "../../constants/index";

const initialState = {
  user: null,
};

export const getUserAsync = createAsyncThunk(
  Reducer.NAME.AUTH + "/fetchUser",
  async () => {
    const user = await axios.get(`${Server.URL}:${Server.PORT}/auth/user`);
    console.log('get');
    return user.data.data;
  }
);

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = authSlice.actions;

export const selectLoggedUser = (state) => state.auth.user;

export default authSlice.reducer;
