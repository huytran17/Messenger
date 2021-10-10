import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ValidateError,
  STRING,
  Reducer,
  Field,
  Server,
  HttpStatus,
} from "../../constants/index";

const initialState = {
  isLoading: false,
  isAllValid: true,
  data: {},
  error: {
    username: STRING.EMPTY,
    address: STRING.EMPTY,
    phone: STRING.EMPTY,
    bio: STRING.EMPTY,
    quote: STRING.EMPTY,
    gender: STRING.EMPTY,
    dob: STRING.EMPTY,
    relationship: STRING.EMPTY,
    avatar_photo: STRING.EMPTY,
    cover_photo: STRING.EMPTY,
  },
};

export const getUserAsync = createAsyncThunk(
  Reducer.NAME.USER + "/fetchUser",
  async (id) => {
    const user = await axios
      .get(`${Server.URL}:${Server.PORT}/users/${id}`)
      .catch((error) => {
        if (error.response.status !== HttpStatus.OK)
          window.location.href = "/auth/login";
      });

    return user.data.data || {};
  }
);

const setStateError = (state) => (path, error) => {
  state.error[path] = error;
};

function checkErrorProperties(obj) {
  for (var key in obj) {
    if (obj[key].length > 0) return false;
  }

  return true;
}

export const userSlice = createSlice({
  name: Reducer.NAME.USER,
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setData: (state, action) => {
      state.data = { ...action.payload };
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
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;

      const payload = action.payload;

      state.data = payload;
    });
  },
});

export const { changeData, validate, setError, setData } = userSlice.actions;

export const selectIsAllValid = (state) => state.user.isAllValid;

export const selectError = (state) => state.user.error;

export const selectData = (state) => state.user.data;

export const selectIsLoading = (state) => state.user.isLoading;

export default userSlice.reducer;
