import { configureStore } from "@reduxjs/toolkit";
import appBarReducer from "./slices/appBarSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    appBar: appBarReducer,
    auth: authReducer,
  },
});
