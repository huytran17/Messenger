import { configureStore } from "@reduxjs/toolkit";
import appBarReducer from "./slices/appBarSlice";
import authFormReducer from "./slices/authFormSlice";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    appBar: appBarReducer,
    authForm: authFormReducer,
    alert: alertReducer,
  },
});
