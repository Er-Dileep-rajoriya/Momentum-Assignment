import { configureStore } from "@reduxjs/toolkit";
import { configureReducer } from "./configReducer";

export const store = configureStore({
  reducer: {
    configureReducer,
  },
});
