import { configureStore } from "@reduxjs/toolkit";

import { authService } from "../services/authService";

import authReducer from "./authSlice";
import { questService } from "../services/questService";


export const store = configureStore({
   reducer: {
      [authService.reducerPath]: authService.reducer,
      [questService.reducerPath]: questService.reducer,
      auth: authReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware, questService.middleware)
})
