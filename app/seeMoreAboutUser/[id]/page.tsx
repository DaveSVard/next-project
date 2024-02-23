"use client"

import { getSingleUserAPI, selectUser, useDispatch, useSelector } from "@/lib/redux"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import "./../../styles/SingleUser.scss"

export default function seeMoreAboutUser () {
    const {id} = useParams()
    const {user} = useSelector(selectUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(getSingleUserAPI(+id))
    }, [id])
    return(
        <div className="singleUser">
            <div className="container">
                <div className="singleUser-wrapper">
                    <h3>About {user.name}</h3>
                    <div className="singleUser__info">
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <img src={user.avatar} alt="Ooops" />
                    </div>
                </div>
            </div>
        </div>
    )
}