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

const setIsAllValid = (state) => (obj) => {
  state.isAllValid =
    checkDataProperties(obj) && checkErrorProperties(state.error);
};

export const authSlice = createSlice({
  name: Reducer.NAME.AUTH_FORM,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      const path = action.payload.path.toLowerCase();

      const type = action.payload.type.toUpperCase();

      const setErrorState = setStateError(state);

      const _setIsAllValid = setIsAllValid(state);

      //validate all data is not empty
      if (state.data[path] === STRING.EMPTY)
        setErrorState(path, ValidateError.REQUIRED);
      //validate email
      else if (path === Field.EMAIL) {
        if (!validateEmail(state.data[path]))
          setErrorState(path, ValidateError.INVALID_EMAIL);
        else setErrorState(path, STRING.EMPTY);
      }
      //validate for register
      if (type === Auth.TYPE.REGISTER || type === Auth.TYPE.RESET_PWD) {
        //validate username
        if (path === Field.USERNAME) {
          if (state.data.username.length < 6)
            setErrorState(path, ValidateError.USERNAME_MIN_LENGTH);
          else if (state.data.username.length > 32)
            setErrorState(path, ValidateError.USERNAME_MAX_LENGTH);
          else setErrorState(path, STRING.EMPTY);
        }
        //validate password & re-password
        else if (path === Field.RE_PASSWORD || path === Field.PASSWORD) {
          //password length
          if (path === Field.PASSWORD) {
            if (state.data.password.length < 8)
              setErrorState(path, ValidateError.PASSWORD_MIN_LENGTH);
            else if (state.data.password.length > 32)
              setErrorState(path, ValidateError.PASSWORD_MAX_LENGTH);
            else setErrorState(path, STRING.EMPTY);
          }

          //match re-pasword
          if (
            state.data.re_password &&
            state.data.re_password !== state.data.password
          )
            setErrorState(Field.RE_PASSWORD, ValidateError.MISMATCH);
          else setErrorState(Field.RE_PASSWORD, STRING.EMPTY);
        }
      } else setErrorState(path, STRING.EMPTY);

      //validate
      //validate login
      if (type === Auth.TYPE.LOGIN) {
        const { email, password } = state.data;

        _setIsAllValid({ email, password });
      }
      //validate register
      else if (type === Auth.TYPE.REGISTER) {
        const { email, username, password, re_password } = state.data;

        _setIsAllValid({ email, username, password, re_password });
      }
      //validate find account
      else if (type === Auth.TYPE.FORGET_PWD) {
        const { email } = state.data;

        _setIsAllValid({ email });
      }
      //validate verify code
      else if (type === Auth.TYPE.VERIFY_CODE) {
        const { verify_code } = state.data;

        _setIsAllValid({ verify_code });
      }
      //validate reset password
      else if (type === Auth.TYPE.RESET_PWD) {
        const { password, re_password } = state.data;

        _setIsAllValid({ password, re_password });
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

export const selectData = (state) => state.authForm.data;

export const selectError = (state) => state.authForm.error;

export const selectIsAllValid = (state) => state.authForm.isAllValid;

export const selectRememberMe = (state) => state.authForm.remember_me;

export default authSlice.reducer;
