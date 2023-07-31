import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseUrl = "https://xsyntwmjef.execute-api.us-east-2.amazonaws.com/dev";

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});