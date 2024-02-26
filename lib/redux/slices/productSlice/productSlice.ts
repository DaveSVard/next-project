import { ProductT } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { filterProductByCategoriesAPI, filterProductsByPriceAPI, filterProductsByRangeAPI, filterProductsByTitleAPI, getAllProductsAPI, getSingleProductAPI, updateProductAPI } from "./thunk";

const initialState:{products:ProductT[], product: ProductT} = {
    products: [],
    product: {} as ProductT
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllProductsAPI.fulfilled, (state, action) => {
            state.products = action.payload
        }).addCase(getSingleProductAPI.fulfilled, (state, action) => {
            state.product = action.payload
        }).addCase(updateProductAPI.fulfilled, (state, action) => {
            state.product = action.payload 
        }).addCase(filterProductsByTitleAPI.fulfilled, (state, action) => {
            state.products = action.payload
        }).addCase(filterProductsByPriceAPI.fulfilled, (state, action) => {
            state.products = action.payload
        }).addCase(filterProductsByRangeAPI.fulfilled, (state, action) => {
            state.products = action.payload
        }).addCase(filterProductByCategoriesAPI.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

