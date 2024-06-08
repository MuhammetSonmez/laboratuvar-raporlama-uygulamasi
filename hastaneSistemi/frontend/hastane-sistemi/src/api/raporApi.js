import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const raporApi = createApi({
  reducerPath: 'raporApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getRaporlar: builder.query({
      query: () => '/raporlar/sort',
    }),
    getRaporById: builder.query({
      query: (id) => `/raporlar/${id}`,
    }),
    createRapor: builder.mutation({
      query: (rapor) => ({
        url: '/raporlar',
        method: 'POST',
        body: rapor,
      }),
    }),
    updateRapor: builder.mutation({
      query: ({ dosyaNumarasi, ...rapor }) => ({
        url: `/raporlar/updateByDosyaNumarasi/${dosyaNumarasi}`,
        method: 'PUT',
        body: rapor,
      }),
    }),
    deleteRapor: builder.mutation({
      query: (dosyaNumarasi) => ({
        url: `/raporlar/${dosyaNumarasi}`,
        method: 'DELETE',
      }),
    }),
    searchRaporlar: builder.query({
      query: (params) => ({
        url: '/raporlar/search',
        params,
      }),
    }),
    sortRaporlar: builder.query({
      query: () => '/raporlar/sort',
    }),
  }),
});

export const {
  useGetRaporlarQuery,
  useGetRaporByIdQuery,
  useCreateRaporMutation,
  useUpdateRaporMutation,
  useDeleteRaporMutation,
  useSearchRaporlarQuery,
  useSortRaporlarQuery,
} = raporApi;
