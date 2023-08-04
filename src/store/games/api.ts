import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAPI/baseQuery";
import { Game } from "./types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery,
  endpoints: (builder) => ({
    getGameById: builder.query<Game, string>({
      query: (gameId) => {
        return {
          url: `games/${gameId}`,
          method: "GET",
        };
      },
    }),
  }),  
});

export const { useGetGameByIdQuery } = gamesApi;