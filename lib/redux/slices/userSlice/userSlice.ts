import { UserT } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersAPI, getSingleUserAPI, profileAPI, updateUserAPI } from "..";

const initialState:{users: UserT[], user:UserT} = {
    users: [],
    user: {} as UserT
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllUsersAPI.fulfilled, (state, action) => {
            state.users = action.payload
        }).addCase(getSingleUserAPI.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(updateUserAPI.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(profileAPI.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})