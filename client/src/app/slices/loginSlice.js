import { createSlice } from "@reduxjs/toolkit";
import { ValidateError, _String, _Reducer } from "../../constants/index";

const initialState = {
  allValid: false,
  data: {
    email: _String.EMPTY,
    password: _String.EMPTY,
  },
  error: {
    email: _String.EMPTY,
    password: _String.EMPTY,
  },
};

console.log(Object.keys(initialState.data));

const validateEmail = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(email.toLowerCase());
};

export const loginSlice = createSlice({
  name: _Reducer.NAME.LOGIN,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      const attr = action.payload.toLowerCase();

      if (state.data[attr] === _String.EMPTY)
        state.error[attr] = ValidateError.REQUIRED;
      else if (attr === _String.EMAIL && !validateEmail(state.data[attr])) {
        state.error[attr] = ValidateError.INVALID_EMAIL;
      } else state.error[attr] = _String.EMPTY;
    },
  },
});

export const { changeData, validate } = loginSlice.actions;

export const selectData = (state) => state.login.data;

export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
