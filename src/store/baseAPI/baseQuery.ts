import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "..";

export const baseUrl = "https://xsyntwmjef.execute-api.us-east-2.amazonaws.com/dev";

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const state: RootState = getState() as RootState;

        return headers;
    },
});