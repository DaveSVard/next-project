"use client"

import { deleteProductAPI, getSingleProductAPI, selectProduct, updateProductAPI, useDispatch, useSelector } from "@/lib/redux"
import { useParams, useRouter } from "next/navigation"
import "./../../styles/SingleProd.scss"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function Id () {
    const {id} = useParams()
    const {product} = useSelector(selectProduct)
    const dispatch = useDispatch()
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<{title:string, price:number}>()

    useEffect(() => {
        if(id) dispatch(getSingleProductAPI(+id))
    }, [id])
    console.log(product);

    const updateProduct = (data:{title:string, price:number}) => {
        dispatch(updateProductAPI({id: product.id, obj: data}))
    }
    
    return(
        <div className="singleProd">
            <div className="container">
                <div className="singleProd-wrapper">
                    <div className="singleProd__info">
                        <h2>About {product.title}</h2>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category?.name}</p>
                        <p className="price">Price: {product.price}</p>
                        <button onClick={() => {
                            dispatch(deleteProductAPI(product.id))
                            router.push("/profile")
                        }}><i className="fa-solid fa-trash-can"></i></button>
                        <div className="singleProd__images">
                            {product?.images?.map((elm, i) => {
                                return(
                                    <img key={i} src={elm} alt="" />
                                )
                            })}
                        </div>
                    </div>
                    <div className="update-product">
                        <form onSubmit={handleSubmit(updateProduct)} className="update-product__form">
                            <input placeholder="Update product title" {...register("title")}/>
                            <input placeholder="Update product price" {...register("price", {
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Use number"
                                }
                            })}/>
                            {errors.price && <p>{errors.price.message}</p>}
                            <button className="btn-2">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}