import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userService = createApi({
   reducerPath: "userService",
   baseQuery: fetchBaseQuery({ baseUrl: "https://quests-app-b4a0b43bd55f.herokuapp.com/user", credentials: "include" }),
   endpoints: (builder) => ({
      getUserInfo: builder.query({
         query: () => "/get-data",
         method: "GET",
      }),
      updateUserInfo: builder.mutation({
         query: (body) => ({
            url: "/",
            method: "PUT",
            body: body
         })
      }),
      // Отримання всіх створених квестів користувача
      getCreatedQuests: builder.query({
         query: () => "/get-created-quests",
         method: "GET",
      }),
   })
});
