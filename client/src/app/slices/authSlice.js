import { createSlice } from "@reduxjs/toolkit";
import { ValidateError, _String, Reducer, Action } from "../../constants/index";

const initialState = {
  isAllValid: false,
  remember_me: false,
  data: {
    email: _String.EMPTY,
    password: _String.EMPTY,
    re_password: _String.EMPTY,
  },
  error: {
    email: _String.EMPTY,
    password: _String.EMPTY,
    re_password: _String.EMPTY,
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

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      const attr = action.payload.path.toLowerCase();

      const type = action.payload.type.toUpperCase();

      //validate all data is not empty
      if (state.data[attr] === _String.EMPTY)
        state.error[attr] = ValidateError.REQUIRED;
      //validate email
      else if (
        attr === _String.formFields.EMAIL &&
        !validateEmail(state.data[attr])
      )
        state.error[attr] = ValidateError.INVALID_EMAIL;
      //validate re-password
      else if (
        (attr === _String.formFields.RE_PASSWORD ||
          attr === _String.formFields.PASSWORD) &&
        type === Action.TYPE.REGISTER
      ) {
        if (
          state.data.re_password &&
          state.data.re_password !== state.data.password
        )
          state.error[_String.formFields.RE_PASSWORD] = ValidateError.MISMATCH;
        else {
          state.error[_String.formFields.RE_PASSWORD] = _String.EMPTY;
        }
      }
      //no errors
      else state.error[attr] = _String.EMPTY;

      //validate login
      if (type === Action.TYPE.LOGIN) {
        const { email, password } = state.data;

        state.isAllValid =
          checkDataProperties({ email, password }) &&
          checkErrorProperties(state.error);
      }
      //validate register
      else if (type === Action.TYPE.REGISTER)
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
  authSlice.actions;

export const selectData = (state) => state.auth.data;

export const selectError = (state) => state.auth.error;

export const selectIsAllValid = (state) => state.auth.isAllValid;

export const selectRememberMe = (state) => state.auth.remember_me;

export default authSlice.reducer;
