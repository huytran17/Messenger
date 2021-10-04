import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Reducer, Server } from "../../constants/index";

const initialState = {
  user: null,
  convs: null,
  grs: null,
};

export const getUserAsync = createAsyncThunk(
  Reducer.NAME.AUTH + "/fetchUser",
  async (id) => {
    const user = await axios.get(`${Server.URL}:${Server.PORT}/users/${id}`);
    console.log(user.data.data);
    return user.data.data || null;
  }
);

const filterMems = (arrObj, id) => {
  arrObj.forEach((item) => {
    item.mems = item.mems.filter((mem) => {
      return mem._id !== id;
    });
  });
};

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      const payload = action.payload;

      filterMems(payload.convs, payload._id);

      state.user = payload;
      state.grs = payload.grs;
      state.convs = payload.convs;
    });
  },
});

export const selectUser = (state) => state.auth.user;

export const selectConvs = (state) => state.auth.convs;

export const selectGrs = (state) => state.auth.grs;

export default authSlice.reducer;
