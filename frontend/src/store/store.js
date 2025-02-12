import { configureStore } from "@reduxjs/toolkit";

import { authService } from "../services/authService";

import authReducer from "./authSlice";
import { questService } from "../services/questService";
import { userService } from "../services/userService";


export const store = configureStore({
   reducer: {
      [authService.reducerPath]: authService.reducer,
      [questService.reducerPath]: questService.reducer,
      [userService.reducerPath]: userService.reducer,
      auth: authReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware, questService.middleware, userService.middleware)
})
