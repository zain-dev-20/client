import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ["Forms"],
  endpoints: (builder) => ({
    getAllForms: builder.query({
      query: () => '/forms',
      providesTags:['Forms']
    }),
    createForm: builder.mutation({
      query: (newUser) => ({
        url: '/forms',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ["Forms"]
    }),
    updateForm: builder.mutation({
      query: ({id,data}) => ({
        url: `/forms/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["Forms"]
    }),
    uploadPdf: builder.mutation({
        query: (file) => {
          const formData = new FormData();
          formData.append("resume", file);
          return {
            url: '/forms/upload',
            method: 'POST',
            body: formData,
          };
        },
      }),
    deleteForm: builder.mutation({
    query: (id) => ({
        url: `/forms/${id}`,
        method: 'DELETE',
    }),
    invalidatesTags: ["Forms"], 
    }),
  }),
});

export const { 
    useGetAllFormsQuery,
    useCreateFormMutation,
    useUploadPdfMutation,
    useDeleteFormMutation,
    useUpdateFormMutation,
} = apiSlice;
