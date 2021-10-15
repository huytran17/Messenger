import { createSlice } from "@reduxjs/toolkit";
import {
  Reducer,
  STRING,
  ValidateCond,
  ValidateError,
} from "../../constants/index";

const initialState = {
  error: {
    hasError: false,
    error: STRING.EMPTY,
  },
};

const validateMIMEType = (file, options) => {
  const type = file.type;

  if (options.allowMimeTypes.includes(type)) {
    return { ok: true };
  }
  return {
    ok: false,
    error:
      ValidateError.FILE_INVALID_TYPE + " accept: " + options.allowMimeTypes,
  };
};

const setFileErrorState = (state) => (hasError, error) => {
  state.error.hasError = hasError;
  state.error.error = error;
};

export const uploadImgSlice = createSlice({
  name: Reducer.NAME.UPLOAD_IMG,
  initialState,
  reducers: {
    validateFile: (state, action) => {
      const file = action.payload;

      const setFileError = setFileErrorState(state);

      if (!file) {
        setFileError(true, ValidateError.REQUIRED);

        return;
      }

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

      if (!result.ok) setFileError(true, result.error);
      else if (file.size > ValidateCond.IMG_MAX_SIZE)
        setFileError(true, ValidateError.IMG_MAX_SIZE);
      else setFileError(false, STRING.EMPTY);
    },
    setFileError: (state, action) => {
      setFileError(true, action.payload.error);
    },
    resetFileError: (state) => {
      const setFileError = setFileErrorState(state);

      setFileError(false, STRING.EMPTY);
    },
  },
});

export const { validateFile, setFileError, resetFileError } =
  uploadImgSlice.actions;

export const selectFileError = (state) => state.uploadImg.error;

export default uploadImgSlice.reducer;
