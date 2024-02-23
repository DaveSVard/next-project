"use client"
import { createUserAPI, useDispatch } from "@/lib/redux"
import { UserT } from "@/type"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import "./../styles/Register.scss"

export default function Register () {
    const [check, setCheck] = useState<string>("")
    const [succes, setSucces] = useState<string>("") 
    const router = useRouter()
    const {register, handleSubmit, reset, formState: {errors}, setError} = useForm<UserT>()
    const dispatch = useDispatch()
    const reg = (data:UserT) => {

        if(check != data.password) {
            setError("password", {message: "You made a mistake in your password...try again"})
        } else {
            dispatch(createUserAPI(data)).unwrap().then(res => {
                setSucces("Finally!! you made it!")
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            })
            reset()
        }
    }
    return(
        <div className="signUp">
            <div className="container">
                <div className="signUp-wrapper">
                    <img src="./../images/registerBg.jpg" alt="" />
                    <div className="signUp-wrapper__div">
                        <h3>{succes || "Wrtie your details"}</h3>
                        <form className="signUp__form" onSubmit={handleSubmit(reg)}>
                            <div>
                                <input placeholder="Enter your name" {...register("name", {
                                    required: "Oops, you forgot to write your name!"
                                })}/>
                                {errors.name && <p className="error">{errors.name.message}</p>}
                            </div>
                            <div>
                                <input placeholder="Enter your email" {...register("email", {
                                    required: "Enter your email dear!"
                                })}/>
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                            <div>
                                <input type="password" placeholder="Enter your password" {...register("password", {
                                    required: "Dont forget about password!"
                                })}/>
                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </div>
                            <div>
                                <input type="password" placeholder="Repeat your password" onChange={(e) => setCheck(e.target.value)}/>
                                {/* {check.length == 0 ? <p className="error">Repeat your password!</p> : <></>} */}
                            </div>
                            <div className="last">
                                <input placeholder="Send your avatar picture Url" {...register("avatar", {
                                    required: "Send us your avatar!"
                                })}/>
                                {errors.avatar && <p className="error">{errors.avatar.message}</p>}
                            </div>
                            <button className="btn-1 last">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}