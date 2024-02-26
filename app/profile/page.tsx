"use client"
import { filterProductByCategoriesAPI, filterProductsByPriceAPI, filterProductsByRangeAPI, filterProductsByTitleAPI, getAllCategoriesAPI, getAllProductsAPI, getAllUsersAPI, profileAPI, selectCategory, selectProduct, selectUser, useDispatch, useSelector } from "@/lib/redux"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "./../styles/Profile.scss"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function Profile () {
    const {user, users} = useSelector(selectUser)
    const {products} = useSelector(selectProduct)
    const {categories} = useSelector(selectCategory)
    const dispatch = useDispatch()
    const router = useRouter()
    const {register, handleSubmit} = useForm<{prodId:number}>()

    useEffect(() => {
        dispatch(profileAPI()).unwrap().
        then(res => {
            console.log(res);
            
        }).catch(() => router.push("/"))
        dispatch(getAllCategoriesAPI())
        dispatch(getAllProductsAPI())
        dispatch(getAllUsersAPI())
    }, [])

    const filterByCategory = (data:{prodId:number}) => {
        dispatch(filterProductByCategoriesAPI(+data.prodId))
    }

    const [bool, setBool] = useState<boolean>(false)
    const open:string = "click to open"
    const close:string = "click to close"

    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)

    return(
        <div className="profile">
            <div className="container">
                <div className="profile-wrapper">
                    <div className="profile__info">
                        <h3>Welcome! {user.name}</h3>
                        <h3>Mail: {user.email}</h3>
                        <img src={user.avatar} alt="" />
                        <div className="profile__info-search">
                            <form className="search-form" onSubmit={handleSubmit(filterByCategory)}>
                                {categories.map(elm => {
                                    return(
                                        <div className="search_form--inner__div" key={elm.id}>
                                            <div>
                                                <div className="search_form--items">
                                                    <label>{elm.name}</label>
                                                    <input type="radio" value={elm.id} {...register("prodId")}/>
                                                </div>
                                                <div>
                                                    <Link href={"/seeMoreAboutCategory/" + elm.id}><i className="fa-solid fa-right-long arrow"></i></Link>
                                                </div>
                                            </div>
                                        </div>  
                                    )
                                })}
                                <button className="btn-2">Filter by category</button>
                            </form>
                            <i className="fa-solid fa-bars-staggered text" onClick={() => setBool(!bool)}><span className="mL">{bool ? close : open}</span></i>
                            {bool ? <div className="filters">
                                <div className="filters__item">
                                    <input placeholder="Enter product title" onChange={(e) => dispatch(filterProductsByTitleAPI(e.target.value))}/>
                                </div>
                                <div className="filters__item">
                                    <input placeholder="Enter product price" onChange={(e) => dispatch(filterProductsByPriceAPI(+e.target.value))}/>
                                </div>
                                <span className="row"></span>
                                <div className="filters__item">
                                    <input placeholder="Enter product min-price" onChange={(e) => setMin(+e.target.value)}/>
                                    <input placeholder="Enter product max-price" onChange={(e) => setMax(+e.target.value)}/>
                                    <button className="btn-1" onClick={() => dispatch(filterProductsByRangeAPI({min: min, max: max}))}>Find!</button>
                                </div>
                            </div> : <></>}
                        </div>
                    </div>
                    <div className="profile-cards">
                    <h3 className="top">All products</h3>
                        {products.map(elm => {
                            return(
                                <div key={elm.id} className="profile-cards__item">
                                    <p>{elm.title}</p>
                                    <p>{elm.category?.name}</p>
                                    <p>Price: {elm.price}</p>
                                    <Link className="center-parent" href={"/seeMoreAboutProd/" + elm.id}>See more <i className="fa-solid fa-caret-right center"></i></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


