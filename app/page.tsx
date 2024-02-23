"use client"
import { loginAPI, useDispatch } from "@/lib/redux"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import "./styles/LogIn.scss"
import { useState } from "react"

export default function Register () {
    const {register, handleSubmit, reset, formState:{errors}} = useForm<{email:string, password:string}>()
    const [message, setMessage] = useState<string>("")
    const dispatch = useDispatch()
    const router = useRouter()
    const logIn = (data:{email:string, password:string}) => {
        console.log(data);
        dispatch(loginAPI(data)).unwrap().then(res => {
          console.log(res);
          localStorage.token = res.access_token
          router.push("/profile")
        }).catch(err => {
            console.error(err);
            setMessage("Oops! something wrong!");
          });
    }

    return(
        <div className="logIn">
           <div className="container">
                <div className="logIn-wrapper">
                    <img src="./../images/1.jpg" alt="" />
                    <div className="logIn-wrapper__div">
                        <h3>{message || "Sign in"}</h3>
                        <form className="logIn-form" onSubmit={handleSubmit(logIn)}>
                            <input placeholder="Enter your email" {...register("email")}/>
                            <input type="password" placeholder="Enter your password" {...register("password")}/>
                            <button className="btn-1 gradient">Sign in</button>
                        </form>
                    </div>
                </div>
           </div>
        </div>
    )
}


// message.current.innerText = "Oops! something wrong!"