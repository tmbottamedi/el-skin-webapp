import { IProduct } from "types/Product";
import { ICarouselItem } from "service/carouselService";
import { API_CONFIG } from "config/APIConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.PRODUCTS,
        method: "GET",
      }),
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: API_CONFIG.ENDPOINTS.PRODUCTS + `/${id}`,
        method: "GET",
      }),
    }),
    getCarouselItems: builder.query<ICarouselItem[], void>({
      query: () => ({
        url: "/carousel",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCarouselItemsQuery,
} = apiSlice;
