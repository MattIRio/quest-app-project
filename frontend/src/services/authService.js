import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
   reducerPath: "authService",
   baseQuery: fetchBaseQuery({ baseUrl: "https://quests-app-b4a0b43bd55f.herokuapp.com" }),
   endpoints: (builder) => ({
      signUp: builder.mutation({
         query: (body) => ({
            url: "/signUpUser",
            method: "POST",
            body: body
         })
      }),
      signIn: builder.mutation({
         query: ({ email, password }) => ({
            url: `/login?email=${email}&password=${password}`,
            method: "POST",
         }),
      }),
      signOut: builder.mutation({
         query: () => ({
            url: "/logout",
            method: "POST",
         })
      }),
      refresh: builder.query({
         query: () => "/refresh"
      }),
   })
})