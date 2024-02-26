import { CategoryT } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoriesAPI, getSingleCategoryAPI, updateCategoryAPI } from "./thunk";

const initialState:{categories:CategoryT[], category:CategoryT} = {
    categories: [],
    category: {} as CategoryT
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllCategoriesAPI.fulfilled, (state, action) => {
            state.categories = action.payload
        }).addCase(getSingleCategoryAPI.fulfilled, (state, action) => {
            state.category = action.payload
        }).addCase(updateCategoryAPI.fulfilled, (state, action) => {
            state.category = action.payload 
        })
    }
})