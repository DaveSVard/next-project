"use client"
import { getAllUsersAPI, profileAPI, selectUser, useDispatch, useSelector } from "@/lib/redux"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import "./../styles/Profile.scss"
import Link from "next/link"

export default function Profile () {
    const {user, users} = useSelector(selectUser)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        dispatch(profileAPI()).unwrap().
        then(res => {
            console.log(res);
            
        }).catch(() => router.push("/"))

        dispatch(getAllUsersAPI())
    }, [])

    
    const logOut = () => {
        localStorage.clear()
        router.push("/")
    }
    return(
        <div className="profile">
            <div className="container">
                <div className="profile-wrapper">
                    <h3>Welcome! {user.name}</h3>
                    <div className="profile-cards">
                        {users.map(elm => {
                            return(
                                <div key={elm.id} className="profile-cards__item">
                                    <p>{elm.name}</p>
                                    <Link className="center-parent" href={"/seeMoreAboutUser/" + elm.id}>See more <i className="fa-solid fa-caret-right center"></i></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


