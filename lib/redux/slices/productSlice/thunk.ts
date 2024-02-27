import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../..";

export const getAllProductsAPI = createAsyncThunk(
    "getAllProducts",
    async () => {
        const {data} = await myAxios.get("/products")
        return data
    }
)

export const getSingleProductAPI = createAsyncThunk(
    "getSingleProduct",
    async (id:number) => {
        const {data} = await myAxios.get("/products/" + id)
        return data
    }
)

export const createProductAPI = createAsyncThunk(
    "createProduct",
    async (obj:{title:string, price:number, description:string, categoryId:number, images:string}) => {
        const {data} = await myAxios.post("/products", {...obj, images:[obj.images]})
        return data
    }
)

export const updateProductAPI = createAsyncThunk(
    "updateProduct",
    async ({id, obj}:{id:number, obj:{title:string, price:number}}) => {
        const {data} = await myAxios.put("/products/" + id, obj)
        return data
    }
)

export const deleteProductAPI = createAsyncThunk(
    "deleteProduct",
    async (id:number) => {
        const {data} = await myAxios.delete("/products/" + id)
        return data
    }
)

export const filterProductsByTitleAPI = createAsyncThunk(
    "filterProdByTitle",
    async (str:string) => {
        const {data} = await myAxios.get("/products/?title=" + str)
        return data
    }
)

export const filterProductsByPriceAPI = createAsyncThunk(
    "filterProdByPrice",
    async (num:number) => {
        const {data} = await myAxios.get("/products/?price=" + num)
        return data
    }
)

export const filterProductsByRangeAPI = createAsyncThunk(
    "filterProductsByRange",
    async ({min, max}:{min:number, max:number}) => {
        const {data} = await myAxios.get(`/products/?price_min=${min}&price_max=${max}`)
        return data
    }
)

export const filterProductByCategoriesAPI = createAsyncThunk(
    "filterProdByCat",
    async (id:number) => {
        const {data} = await myAxios.get(`/products/?categoryId=` + id)
        return data
    }
)


