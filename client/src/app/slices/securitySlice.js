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
    password: STRING.EMPTY,
    newPassword: STRING.EMPTY,
    resetPassword: STRING.EMPTY,
  },
  error: {
    password: STRING.EMPTY,
    newPassword: STRING.EMPTY,
    resetPassword: STRING.EMPTY,
  },
};

const setStateError = (state) => (path, error) => {
  state.error[path] = error;
};

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== STRING.EMPTY) return false;
  }
  return true;
}

export const securitySlice = createSlice({
  name: Reducer.NAME.SECURITY,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {},
    setError: (state, action) => {
      const payload = action.payload;

      state.error[payload.path] = payload.error;

      state.isAllValid = false;
    },
  },
});

export const { changeData, validate, setError } = securitySlice.actions;

export const selectData = (state) => state.security.data;

export const selectError = (state) => state.security.error;

export const selectIsAllValid = (state) => state.security.isAllValid;

export default securitySlice.reducer;
