import { configureStore } from "@reduxjs/toolkit";
import appBarReducer from "./slices/appBarSlice";

export const store = configureStore({
  reducer: {
    appBar: appBarReducer,
  },
});
