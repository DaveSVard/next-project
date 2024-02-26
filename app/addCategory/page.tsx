"use client"

import { CategoryT } from "@/type"
import "./../styles/Create.scss"
import { useForm } from "react-hook-form"
import { createCategoryAPI, useDispatch } from "@/lib/redux"

export default function addCategory () {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CategoryT>()
    const dispatch = useDispatch()
    const createCategory = (data:CategoryT) => {
        dispatch(createCategoryAPI(data))
        
    }

    return(
        <div className="create">
            <div className="container">
                <div className="create-wrapper">
                    <h3>Add Category</h3>
                    <form onSubmit={handleSubmit(createCategory)} className="create-form">
                        <input placeholder="Enter category name" {...register("name", {
                            required: "Enter category name"
                        })}/>
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <input placeholder="Enter category imageURL" {...register("image", {
                            required: "Enter category imageURL"
                        })}/>
                        {errors.image && <p className="error">{errors.image.message}</p>}
                        <button className="btn-2">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}