import { createSlice } from "@reduxjs/toolkit";
import { ValidateError, _String, Reducer, Action } from "../../constants/index";

const initialState = {
  isAllValid: false,
  remember_me: false,
  data: {
    username: _String.EMPTY,
    email: _String.EMPTY,
    password: _String.EMPTY,
    re_password: _String.EMPTY,
  },
  error: {
    username: _String.EMPTY,
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

const setStateError =
  (state) =>
  (path, value = _String.EMPTY) => {
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
      if (state.data[attr] === _String.EMPTY)
        setState(attr, ValidateError.REQUIRED);
      //validate email
      else if (attr === _String.formFields.EMAIL) {
        if (!validateEmail(state.data[attr]))
          setState(attr, ValidateError.INVALID_EMAIL);
        else setState(attr, _String.EMPTY);
      }
      //validate for register
      else if (type === Action.TYPE.REGISTER) {
        //validate username
        if (attr === _String.formFields.USERNAME) {
          if (state.data.username.length < 6)
            setState(
              _String.formFields.USERNAME,
              ValidateError.USERNAME_MIN_LENGTH
            );
          else setState(_String.formFields.USERNAME, _String.EMPTY);
        }
        //validate password & re-password
        else if (
          attr === _String.formFields.RE_PASSWORD ||
          attr === _String.formFields.PASSWORD
        ) {
          //password length
          if (attr === _String.formFields.PASSWORD) {
            if (state.data.password.length < 8)
              setState(
                _String.formFields.PASSWORD,
                ValidateError.PASSWORD_MIN_LENGTH
              );
            else setState(_String.formFields.PASSWORD, _String.EMPTY);
          }

          //match re-pasword
          if (
            state.data.re_password &&
            state.data.re_password !== state.data.password
          )
            setState(_String.formFields.RE_PASSWORD, ValidateError.MISMATCH);
          else setState(_String.formFields.RE_PASSWORD, _String.EMPTY);
        }
      } else setState(attr, _String.EMPTY);

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
