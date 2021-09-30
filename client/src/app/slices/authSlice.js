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
  remember_me: false,
  data: {
    username: STRING.EMPTY,
    email: STRING.EMPTY,
    password: STRING.EMPTY,
    re_password: STRING.EMPTY,
    verify_code: STRING.EMPTY,
  },
  error: {
    username: STRING.EMPTY,
    email: STRING.EMPTY,
    password: STRING.EMPTY,
    re_password: STRING.EMPTY,
    verify_code: STRING.EMPTY,
  },
};

const validateEmail = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(email.toLowerCase());
};

function checkDataProperties(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === STRING.EMPTY) return false;
  }
  return true;
}

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== STRING.EMPTY) return false;
  }
  return true;
}

const setStateError =
  (state) =>
  (path, value = STRING.EMPTY) => {
    state.error[path] = value;
  };

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

      const setState = setStateError(state);

      //validate all data is not empty
      if (state.data[attr] === STRING.EMPTY)
        setState(attr, ValidateError.REQUIRED);
      //validate email
      else if (attr === Field.EMAIL) {
        if (!validateEmail(state.data[attr]))
          setState(attr, ValidateError.INVALID_EMAIL);
        else setState(attr, STRING.EMPTY);
      }
      //validate for register
      else if (type === Auth.TYPE.REGISTER || type === Auth.TYPE.RESET_PWD) {
        //validate username
        if (attr === Field.USERNAME) {
          if (state.data.username.length < 6)
            setState(Field.USERNAME, ValidateError.USERNAME_MIN_LENGTH);
          else setState(Field.USERNAME, STRING.EMPTY);
        }
        //validate password & re-password
        else if (attr === Field.RE_PASSWORD || attr === Field.PASSWORD) {
          //password length
          if (attr === Field.PASSWORD) {
            if (state.data.password.length < 8)
              setState(Field.PASSWORD, ValidateError.PASSWORD_MIN_LENGTH);
            else setState(Field.PASSWORD, STRING.EMPTY);
          }

          //match re-pasword
          if (
            state.data.re_password &&
            state.data.re_password !== state.data.password
          )
            setState(Field.RE_PASSWORD, ValidateError.MISMATCH);
          else setState(Field.RE_PASSWORD, STRING.EMPTY);
        }
      } else setState(attr, STRING.EMPTY);

      //validate
      //validate login
      if (type === Auth.TYPE.LOGIN) {
        const { email, password } = state.data;

        state.isAllValid =
          checkDataProperties({ email, password }) &&
          checkErrorProperties(state.error);
      }
      //validate register
      else if (type === Auth.TYPE.REGISTER) {
        const { email, username, password, re_password } = state.data;

        state.isAllValid =
          checkDataProperties({ email, username, password, re_password }) &&
          checkErrorProperties(state.error);
      }
      //validate find account
      else if (type === Auth.TYPE.FORGET_PWD) {
        const { email } = state.data;

        state.isAllValid =
          checkDataProperties({ email }) && checkErrorProperties(state.error);
      }
      //validate verify code
      else if (type === Auth.TYPE.VERIFY_CODE) {
        const { verify_code } = state.data;

        state.isAllValid =
          checkDataProperties({ verify_code }) &&
          checkErrorProperties(state.error);
      } else if (type === Auth.TYPE.RESET_PWD) {
        const { password, re_password } = state.data;

        state.isAllValid =
          checkDataProperties({ password, re_password }) &&
          checkErrorProperties(state.error);
      }
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
