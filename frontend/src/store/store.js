import { configureStore } from "@reduxjs/toolkit";

import { authService } from "../services/authService";

import authReducer from "./authSlice";


export const store = configureStore({
   reducer: {
      [authService.reducerPath]: authService.reducer,
      auth: authReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware)
})
