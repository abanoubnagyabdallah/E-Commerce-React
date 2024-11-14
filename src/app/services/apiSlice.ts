import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductToEdit } from "../../interfaces/interface";
import cookieService from "../../services/cookieService";

interface GetAdminDashboardProductsResponse {
    data: IProduct[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    endpoints: (builder) => ({
        getAdminDashboardProducts: builder.query<GetAdminDashboardProductsResponse, number>({
            query: (page) => {
                return `/api/products?pagination[pageSize]=7&pagination[page]=${page}&populate=*`
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'products' as const, id })),
                        { type: 'products', id: 'LIST' },
                    ]
                    : [{ type: 'products', id: 'LIST' }],
        }),

        deleteDashboardProducts: builder.mutation<void, number>({
            query: (id) => {
                return {
                    url: `/api/products/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${cookieService.get('jwt')}`
                    }
                }
            },
            invalidatesTags: [{ type: "products", id: "LIST" }]
        }),

        updateDashboardProducts: builder.mutation<void, { id: number; body: IProductToEdit|FormData }>({
            query: ({ id, body }) => ({
                url: `/api/products/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${cookieService.get('jwt')}`,
                    "Content-Type": "application/json"
                },
                body,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getAdminDashboardProducts", id, (draft) => {
                        Object.assign(draft, patch); 
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: [{ type: "products", id: "LIST" }],
        })

    }),

})

export const { useGetAdminDashboardProductsQuery, useDeleteDashboardProductsMutation, useUpdateDashboardProductsMutation } = apiSlice

