import { createSlice } from "@reduxjs/toolkit";
import {
  ValidateError,
  STRING,
  Reducer,
  Auth,
  Field,
} from "../../constants/index";

const initialState = {
  isAllValid: false,
  data: {
    username: STRING.EMPTY,
    address: STRING.EMPTY,
    phone: STRING.EMPTY,
    bio: STRING.EMPTY,
    quote: STRING.EMPTY,
    gender: STRING.EMPTY,
    dob: STRING.EMPTY,
    relationship: STRING.EMPTY,
  },
  error: {
    username: STRING.EMPTY,
    address: STRING.EMPTY,
    phone: STRING.EMPTY,
    bio: STRING.EMPTY,
    quote: STRING.EMPTY,
    gender: STRING.EMPTY,
    dob: STRING.EMPTY,
    relationship: STRING.EMPTY,
  },
};

export const updateInfoSlice = createSlice({
  name: Reducer.NAME.UPDATE_INFO,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      console.log(state.data);
    },
    validate: (state, action) => {
      let payload = action.payload;

      let path = payload.path.toLowerCase();

      

    },
    setError: (state, action) => {},
  },
});

export const { changeData, validate, setError } = updateInfoSlice.actions;

export const selectIsAllValid = (state) => state.updateInfo.isAllValid;

export const selectData = (state) => state.updateInfo.data;

export const selectError = (state) => state.updateInfo.error;

export default updateInfoSlice.reducer;
