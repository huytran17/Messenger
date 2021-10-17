import { createSlice } from "@reduxjs/toolkit";
import { Field, Reducer, STRING, ValidateError } from "../../constants/index";

const initialState = {
  isAllValid: false,
  data: {
    password: STRING.EMPTY,
    new_password: STRING.EMPTY,
    re_password: STRING.EMPTY,
  },
  error: {
    password: STRING.EMPTY,
    new_password: STRING.EMPTY,
    re_password: STRING.EMPTY,
  },
};

const setStateError = (state) => (path, error) => {
  state.error[path] = error;
};

function checkDataProperties(obj) {
  for (var key in obj) {
    if (obj[key].length === 0) return false;
  }

  return true;
}

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key].length > 0) return false;
  }
  return true;
}

const setIsAllValid = (state) => (obj) => {
  state.isAllValid =
    checkDataProperties(obj) && checkErrorProperties(state.error);
};

export const securitySlice = createSlice({
  name: Reducer.NAME.SECURITY,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      const path = action.payload.path;

      const setErrorState = setStateError(state);

      const _setIsAllValid = setIsAllValid(state);

      if (state.data[path] === STRING.EMPTY || state.data[path] === undefined)
        setErrorState(path, ValidateError.REQUIRED);
      else if (state.data[path].length < 8)
        setErrorState(path, ValidateError.PASSWORD_MIN_LENGTH);
      else if (state.data[path].length > 32)
        setErrorState(path, ValidateError.PASSWORD_MAX_LENGTH);
      else setErrorState(path, STRING.EMPTY);

      if (
        state.data.re_password &&
        state.data.new_password !== state.data.re_password
      )
        setErrorState(Field.RE_PASSWORD, ValidateError.MISMATCH);
      else setErrorState(Field.RE_PASSWORD, STRING.EMPTY);

      _setIsAllValid(state.data);
    },
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
