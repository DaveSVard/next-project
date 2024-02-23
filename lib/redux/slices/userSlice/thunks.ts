import { UserT } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../..";

export const getAllUsersAPI = createAsyncThunk(
    "getAllUser",
    async () => {
        const {data} = await myAxios.get("/users")
        return data
    }
)

export const getSingleUserAPI = createAsyncThunk(
    "getSingleUser",
    async (id:number) => {
        const {data} = await myAxios.get(`/users/${id}`)
        return data
    }
)

export const createUserAPI = createAsyncThunk(
    "createUserAPI",
    async (obj:UserT) => {
        const {data} = await myAxios.post(`/users`, obj)
        return data
    }
)

export const updateUserAPI = createAsyncThunk(
    "updateUserAPI",
    async ({id, obj}:{id:number, obj:{name: string, email:string}}) => {
        const {data} = await myAxios.put("/users/" + id, obj)
        return data
    }
)

export const loginAPI = createAsyncThunk(
    "login",
    async (obj:{email:string, password:string}) => {
        const {data} = await myAxios.post("auth/login", obj)
        return data
    }
)

export const profileAPI = createAsyncThunk(
    "profile",
    async () => {
        const token = localStorage.token
        const {data} = await myAxios.get("/auth/profile", {headers: {Authorization: `Bearer ${token}`}})
        return data
    }
)


