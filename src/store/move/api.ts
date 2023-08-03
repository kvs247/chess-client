import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAPI/baseQuery";
import { MoveRequest, MoveResponse } from "./types";

export const moveApi = createApi({
  reducerPath: "moveApi",
  baseQuery,
  endpoints: (builder) => ({
    processMove: builder.mutation<MoveResponse, MoveRequest>({
      query: (payload) => {
        return {
          url: "move",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useProcessMoveMutation } = moveApi;