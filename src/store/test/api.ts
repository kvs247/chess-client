import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAPI/baseQuery";
import { GetTestResponse } from "./types";

export const testApi = createApi({
    reducerPath: "testApi",
    baseQuery,
    endpoints: (builder) => ({
        getTest: builder.query<GetTestResponse, null>({
            query: () => "test",
        }),
    }),
});

export const { useGetTestQuery } = testApi; 