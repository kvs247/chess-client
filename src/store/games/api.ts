import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAPI/baseQuery";
import { Game } from "./types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery,
  tagTypes: ["Games"],
  endpoints: (builder) => ({
    getGameById: builder.query<Game, string>({
      query: (gameId) => {
        return {
          url: `games/${gameId}`,
          method: "GET",
        };
      },
      providesTags: ["Games"],
    }),
  }),  
});

export const { useGetGameByIdQuery } = gamesApi;