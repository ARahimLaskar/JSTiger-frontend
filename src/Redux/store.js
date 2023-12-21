import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./rootReducer";

export const store = configureStore({
  reducer: userSlice,
});
