"use client"

import { deleteCategoryAPI, filterProductByCategoriesAPI, getSingleCategoryAPI, selectCategory, selectProduct, useDispatch, useSelector } from "@/lib/redux"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import "./../../styles/SingleCategory.scss"
import Link from "next/link"

export default function Id () {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {products} = useSelector(selectProduct)
    const {category} = useSelector(selectCategory)
    const router = useRouter()
    useEffect(() => {
        dispatch(getSingleCategoryAPI(+id))
        dispatch(filterProductByCategoriesAPI(+id))
    }, [id])
    
    console.log(category)
    console.log(products);
    
    
    return (
        <div className="singleCat">
            <div className="container">
                <div className="singleCat-wrapper">
                    <h3>About category: {category.name}</h3>
                    <button className="btn-2" onClick={() => {
                        dispatch(deleteCategoryAPI(category.id))
                        router.push("/profile")
                    }}>Delete category</button>
                    <div className="singleCat__info">
                        <h3>Products in this category</h3>
                        <div className="singleCat__info--cards">
                            {products.map(elm => {
                                return(
                                    <div className="singleCat__info--cards__items" key={elm.id}>
                                        <p>{elm.title}</p>
                                        <p>{elm.description}</p>
                                        <Link className="center-parent" href={"/seeMoreAboutProd/" + elm.id}>See more <i className="fa-solid fa-caret-right center"></i></Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}