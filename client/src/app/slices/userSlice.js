import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ValidateError,
  STRING,
  Reducer,
  Field,
  Server,
} from "../../constants/index";

const initialState = {
  isAllValid: true,
  convs: null,
  grs: null,
  data: {
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
    const user = await axios.get(`${Server.URL}:${Server.PORT}/users/${id}`);
    console.log(user.data.data);
    return user.data.data || null;
  }
);

const filterMems = (arrObj, id) => {
  arrObj.forEach((item) => {
    item.mems = item.mems.filter((mem) => {
      return mem._id !== id;
    });
  });
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

export const authSlice = createSlice({
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
        //
        else if (state.data[path].length < 6)
          setErrorState(path, ValidateError.USERNAME_MIN_LENGTH);
        //
        else if (state.data[path].length > 32)
          setErrorState(path, ValidateError.USERNAME_MAX_LENGTH);
        //
        else setErrorState(path, STRING.EMPTY);
      }
      //validate address
      else if (path === Field.ADDRESS) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.ADDRESS_MAX_LENGTH);
        //
        else setErrorState(path, STRING.EMPTY);
      }
      //validate bio
      else if (path === Field.BIO) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.BIO_MAX_LENGTH);
        //
        else setErrorState(path, STRING.EMPTY);
      }
      //validate quote
      else if (path === Field.QUOTE) {
        if (state.data[path].length > 255)
          setErrorState(path, ValidateError.QUOTE_MAX_LENGTH);
        //
        else setErrorState(path, STRING.EMPTY);
      }

      //set is all valid
      state.isAllValid = checkErrorProperties(state.error);
    },
    setError: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      const payload = action.payload;

      filterMems(payload.convs, payload._id);

      state.data = payload;

      state.grs = payload.grs;

      state.convs = payload.convs;
    });
  },
});

export const { changeData, validate, setError, setData } = authSlice.actions;

export const selectIsAllValid = (state) => state.user.isAllValid;

export const selectError = (state) => state.user.error;

export const selectData = (state) => state.user.data;

export const selectConvs = (state) => state.user.convs;

export const selectGrs = (state) => state.user.grs;

export default authSlice.reducer;
