import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getQuestsService = createApi({
    reducerPath: "getQuestsService",
    baseQuery: fetchBaseQuery({ baseUrl: "https://quests-app-b4a0b43bd55f.herokuapp.com" }),
    endpoints: (builder) => ({
        getQuests: builder.query({
            query: ({ page = 1, size = 20, sort = 'name' }) => ({
                url: "/quest/get-quests",
                method: "GET",
                params: {
                    page,
                    size,
                    sort
                }
            })
        }),
    })

});
