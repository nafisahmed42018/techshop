import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './api-slice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
    }),
  }),
})

export const { useGetProductsQuery } = productsApiSlice
