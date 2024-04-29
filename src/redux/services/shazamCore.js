import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "b1c0775f5emsh4c3b578269cb7b9p1de69bjsn09b4effdb540"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: (countryCode = 'DZ') => `/charts/world?country_code=${countryCode}` }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
