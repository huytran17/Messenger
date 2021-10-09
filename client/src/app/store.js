import { configureStore } from "@reduxjs/toolkit";
import appBarReducer from "./slices/appBarSlice";
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    appBar: appBarReducer,
    auth: authReducer,
    alert: alertReducer,
    user: userReducer,
  },
});
