"use client"

import { useForm } from "react-hook-form"
import "./../styles/Create.scss"
import { ProductT } from "@/type"
import { createProductAPI, getAllCategoriesAPI, selectCategory, useDispatch, useSelector } from "@/lib/redux"
import { useEffect } from "react"

export default function addProduct () {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<{title:string, price:number, description:string, categoryId:number, images:string[]}>()
    const {categories} = useSelector(selectCategory)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategoriesAPI())
    }, [])

    const createProduct = (data:{title:string, price:number, description:string, categoryId:number, images:string[]}) => {
        let imagesArr = []
        imagesArr.push(data.images)
        if(data.categoryId && data.price) {
            data.categoryId = +data.categoryId
            data.price = +data.price
        }
        console.log(data);
        dispatch(createProductAPI({title:data.title, price:data.price, description: data.description, categoryId: data.categoryId, images: [...data.images]}))
    }

    return(
        <div className="create">
            <div className="container">
                <div className="create-wrapper">
                    <h3>Create Product</h3>
                    <form className="create-form" onSubmit={(handleSubmit(createProduct))}>
                        <input placeholder="Enter product title" {...register("title", {
                            required: "Enter product title"
                        })}/>
                        {errors.title && <p className="error">{errors.title.message}</p>}
                        <input placeholder="Enter product description" {...register("description", {
                            required: "Enter product description"
                        })}/>
                        {errors.description && <p className="error">{errors.description.message}</p>}
                        <input placeholder="Enter product price" {...register("price", {
                            required: "Enter product price",
                            pattern: {
                                value: /^\d+$/,
                                message: "Use number"
                            }
                        })}/>
                        {errors.price && <p className="error">{errors.price.message}</p>}
                        <input placeholder="Enter product image" {...register("images", {
                            required: "Send product image"
                        })}/>
                        {errors.images && <p className="error">{errors.images.message}</p>}
                        <select {...register("categoryId", {
                            required: "Select category"
                        })}>
                            <option value="" hidden>Select product category</option>
                            {categories.map(elm => {
                                return(
                                    <option key={elm.id} value={elm.id}>{elm.name}</option>
                                )
                            })}
                        </select>
                        {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}
                        <button className="btn-2">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}