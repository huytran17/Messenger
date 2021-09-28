import { createSlice } from "@reduxjs/toolkit";
import { ValidateError, _String, _Reducer } from "../../constants/index";

const initialState = {
  isAllValid: false,
  remember_me: false,
  data: {
    email: _String.EMPTY,
    password: _String.EMPTY,
  },
  error: {
    email: _String.EMPTY,
    password: _String.EMPTY,
  },
};

const validateEmail = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(email.toLowerCase());
};

function checkDataProperties(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === _String.EMPTY) return false;
  }
  return true;
}

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== _String.EMPTY) return false;
  }
  return true;
}

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

      state.isAllValid =
        checkDataProperties(state.data) && checkErrorProperties(state.error);
    },
    setError: (state, action) => {
      const payload = action.payload;
      state.error[payload.path] = payload.error;
      state.isAllValid = false;
    },
    rememberMeCheck: (state) => {
      state.remember_me = !state.remember_me;
    },
  },
});

export const { changeData, validate, setError, rememberMeCheck } =
  loginSlice.actions;

export const selectData = (state) => state.login.data;

export const selectError = (state) => state.login.error;

export const selectIsAllValid = (state) => state.login.isAllValid;

export const selectRememberMe = (state) => state.login.remember_me;

export default loginSlice.reducer;
