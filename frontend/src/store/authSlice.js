import { createSlice } from "@reduxjs/toolkit";

import { authService } from "../services/authService";



const initialState = {
   user: null, accessToken: null, isAuthenticated: false
}

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      tokenReceived(state, action) {
         state.accessToken = action.payload.accessToken
      },
      loggedOut(state) {
         state.accessToken = null;
         state.isAuthenticated = false;
         state.user = null
      }
   },
   extraReducers: (builder) => {
      builder.addMatcher(
         authService.endpoints.signUp.matchFulfilled,
         (state, action) => {
            state.user = JSON.stringify({
               username: action.payload.userName,
               email: action.payload.email
            })
            state.isAuthenticated = true;
            localStorage.setItem("username", action.payload.userName)
         }
      );
      builder.addMatcher(
         authService.endpoints.signIn.matchFulfilled,
         (state, action) => {
            // state.user = JSON.stringify({
            //    username: action.payload.userName,
            //    email: action.payload.email
            // })
            state.isAuthenticated = true;
            // localStorage.setItem("username", action.payload.userName)
         }
      );
      builder.addMatcher(
         authService.endpoints.signOut.matchFulfilled,
         (state) => {
            state.user = null
            state.isAuthenticated = false;
            localStorage.removeItem("username")
         }
      )
   }
})
export const { tokenReceived, loggedOut } = authSlice.actions
export default authSlice.reducer