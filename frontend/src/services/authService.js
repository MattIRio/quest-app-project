import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
   reducerPath: "authService",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
   endpoints: (builder) => ({
      signUp: builder.mutation({
         query: (body) => ({
            url: "/signUpUser",
            method: "POST",
            body: body
         })
      }),
      signIn: builder.query({
         query: ({ email, password }) => ({
            url: `/login?email=${email}&password=${password}`,
            method: "GET",
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