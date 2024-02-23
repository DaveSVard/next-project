"use client"

import { profileAPI, selectUser, updateUserAPI, useDispatch, useSelector } from "@/lib/redux"
import "./../styles/Settings.scss"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export default function SettingsUser () {
    const {user} = useSelector(selectUser)
    console.log(user);

    useEffect(() => {
        dispatch(profileAPI()).unwrap().
        then(res => {
            console.log(res);
            
        }).catch(() => router.push("/"))
    }, [])

    
    const router = useRouter()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm<{name:string, email:string}>()
    const update = (data:{name:string, email:string}) => {
        dispatch(updateUserAPI({id: user.id, obj: data}))
    }   

    return(
        <div className="settings">
            <div className="container">
                <div className="settings-wrapper">
                    <img src="./../images/treeBG3.jpg" alt="" />
                    <div className="settings-wrapper__div">
                        <h3>Settings</h3>
                        <form onSubmit={handleSubmit(update)} className="settings__form">
                            <input placeholder="Change your name" {...register("name")}/>
                            <input placeholder="Change your email"  {...register("email")}/>
                            <button className="btn-1">Confirm changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}