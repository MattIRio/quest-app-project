import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questService = createApi({
   reducerPath: "questService",
   baseQuery: fetchBaseQuery({ baseUrl: "https://quests-app-b4a0b43bd55f.herokuapp.com", credentials: "include" }),
   endpoints: (builder) => ({
      initQuestId: builder.mutation({
         query: (body) => ({
            url: "/quest",
            method: "POST",
            body: body
         })
      }),
      addTaskToQuest: builder.mutation({
         query: ({ questID, formData }) => ({
            url: `/task/create-task?questID=${questID}`,
            method: "POST",
            body: formData, // Передаємо FormData напряму
            formData: true,
         }),
      }),
      getQuests: builder.query({
         query: ({ page = 1, size = 20, sort = 'name' }) => ({
            url: "/quest/get-quests",
            method: "GET"
         })
      }),
   })
})