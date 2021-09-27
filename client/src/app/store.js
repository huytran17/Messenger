import { configureStore } from "@reduxjs/toolkit";
import appBarReducer from "./slices/appBarSlice";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    appBar: appBarReducer,
    login: loginReducer,
  },
});
