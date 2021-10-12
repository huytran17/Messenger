import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { validateMIMEType } from "validate-image-type";
import {
  ValidateCond,
  ValidateError,
  STRING,
  Reducer,
  Field,
  Server,
  HttpStatus,
} from "../../constants/index";

const initialState = {
  isValid: false,
  data: {
    file: STRING.EMPTY,
  },
  error: {
    file: STRING.EMPTY,
  },
};

export const uploadSlice = createSlice({
  name: Reducer.NAME.UPLOAD_IMG,
  initialState,
  reducers: {
    getFile: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    validate: (state, action) => {
      const file = action.payload.file;

      const result = validateMIMEType(file, {
        allowMimeTypes: [
          "image/jpeg",
          "image/gif",
          "image/png",
          "image/svg+xml",
          "image/x-icon",
          "image/webp",
        ],
      });
      if (!result.ok) {
        state.error.file = result.error;

        return;
      }

      if (file.size > ValidateCond.IMG_MAX_SIZE)
        state.error.file = ValidateError.IMG_MAX_SIZE;
    },
    setError: (state, action) => {
      const payload = action.payload;

      state.error[payload.path] = payload.error;

      state.isValid = false;
    },
  },
});
