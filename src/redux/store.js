import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice.js";
import { apiSlice } from "./apiSlice.js";

export const store = configureStore({
  reducer: {
    form: formReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});

export default store;
