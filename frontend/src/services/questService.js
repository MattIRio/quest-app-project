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
      completeTask: builder.mutation({
         query: ({ taskId, result, receivedAnswer }) => ({
            url: `/task-completed?taskId=${taskId}&result=${result}&receivedAnswer=${receivedAnswer}`,
            method: "PUT"
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
      startQuest: builder.mutation({
         query: ({ questId, startedAt }) => ({
            url: `/start-quest?questId=${questId}&startedAt=${startedAt}`,
            method: "POST"
         })
      }),
      rateQuest: builder.mutation({
         query: ({ questId, userGrade }) => ({
            url: `/quest-completed?questId=${questId}&userGrade=${userGrade}`,
            method: "PUT"
         })
      }),
      getQuests: builder.query({
         query: ({ page = 1, size = 20, sort = 'name' }) => ({
            url: "/quest/get-quests",
            method: "GET"
         })
      }),
      getQuestById: builder.query({
         query: (id) => ({
            url: "/quest/get-quest-by-id/" + id,
            method: "GET"
         })
      }),

   })
})