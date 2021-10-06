import { createSlice } from "@reduxjs/toolkit";
import { ValidateError, STRING, Reducer, Field } from "../../constants/index";

const initialState = {
  isAllValid: true,
  data: {
    username: STRING.EMPTY,
    address: STRING.EMPTY,
    phone: STRING.EMPTY,
    bio: STRING.EMPTY,
    quote: STRING.EMPTY,
    gender: 1,
    dob: STRING.EMPTY,
    relationship: 1,
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

const setStateError = (state) => (path, error) => {
  state.error[path] = error;
};

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== STRING.EMPTY) return false;
  }
  return true;
}

export const updateInfoSlice = createSlice({
  name: Reducer.NAME.UPDATE_INFO,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      let payload = action.payload;

      let path = payload.path.toLowerCase();

      let setErrorState = setStateError(state);

      //validate username
      if (path === Field.USERNAME) {
        if (state.data[path] === STRING.EMPTY)
          setErrorState(path, ValidateError.REQUIRED);
        else if (state.data[path].length < 6)
          setErrorState(path, ValidateError.USERNAME_MIN_LENGTH);
        else if (state.data[path].length > 32)
          setErrorState(path, ValidateError.USERNAME_MAX_LENGTH);
        else setErrorState(path, STRING.EMPTY);
      }
      //validate address
      else if (path === Field.ADDRESS) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.ADDRESS_MAX_LENGTH);
        else setErrorState(path, STRING.EMPTY);
      }
      //validate bio
      else if (path === Field.BIO) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.BIO_MAX_LENGTH);
        else setErrorState(path, STRING.EMPTY);
      }
      //validate quote
      else if (path === Field.QUOTE) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.QUOTE_MAX_LENGTH);
        else setErrorState(path, STRING.EMPTY);
      }

      //set is all valid
      state.isAllValid = checkErrorProperties(state.error);
    },
    setError: (state, action) => {},
  },
});

export const { changeData, validate, setError } = updateInfoSlice.actions;

export const selectIsAllValid = (state) => state.updateInfo.isAllValid;

export const selectData = (state) => state.updateInfo.data;

export const selectError = (state) => state.updateInfo.error;

export default updateInfoSlice.reducer;
