import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const laborantApi = createApi({
  reducerPath: 'laborantApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getLaborants: builder.query({
      query: () => '/laborants',
    }),
    getLaborantById: builder.query({
      query: (id) => `/laborants/${id}`,
    }),
    createLaborant: builder.mutation({
      query: (laborant) => ({
        url: '/laborants',
        method: 'POST',
        body: laborant,
      }),
    }),
    updateLaborant: builder.mutation({
      query: ({ hastaneKimlikNumarasi, ...laborant }) => ({
        url: `/laborants/updateByHastaneKimlikNumarasi/${hastaneKimlikNumarasi}`,
        method: 'PUT',
        body: laborant,
      }),
    }),
    deleteLaborant: builder.mutation({
      query: (hastaneKimlikNumarasi) => ({
        url: `/laborants/${hastaneKimlikNumarasi}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetLaborantsQuery,
  useGetLaborantByIdQuery,
  useCreateLaborantMutation,
  useUpdateLaborantMutation,
  useDeleteLaborantMutation,
} = laborantApi;
