import { createAsyncThunk } from "@reduxjs/toolkit"
import { myAxios } from "../.."
import { CategoryT } from "@/type"

export const getAllCategoriesAPI = createAsyncThunk(
    "getAllCategories",
    async () => {
        const {data} = await myAxios.get("/categories")
        return data
    }
)

export const getSingleCategoryAPI = createAsyncThunk(
    "getSingleCategory",
    async (id:number) => {
        const {data} = await myAxios.get("/categories/" + id)
        return data
    }
)

export const createCategoryAPI = createAsyncThunk(
    "createCategory",
    async (obj:CategoryT) => {
        const {data} = await myAxios.post("/categories/", obj)
        return data
    }
)

export const updateCategoryAPI = createAsyncThunk(
    "updateCategory",
    async ({id, obj}:{id:number, obj:CategoryT}) => {
        const {data} = await myAxios.put("/categories/" + id, obj)
        return data
    }
)


export const deleteCategoryAPI = createAsyncThunk(
    "deleteCategory",
    async (id:number) => {
        const {data} = await myAxios.delete("/categories/" + id)
        return data
    }
)