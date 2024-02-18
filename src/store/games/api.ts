import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAPI/baseQuery";
import { GetGameResponse } from "./types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery,
  tagTypes: ["Games"],
  endpoints: (builder) => ({
    getGameById: builder.query<GetGameResponse, string>({
      query: (gameId) => {
        return {
          url: `games/${gameId}`,
          method: "GET",
        };
      },
      providesTags: ["Games"],
    }),
    resetGameById: builder.mutation<any, string>({
      query: (gameId) => {
        return {
          url: `resetGame/${gameId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Games"],
    }),
  }),
});

export const { useGetGameByIdQuery } = gamesApi;