import { useState } from "react";
import { LoginOption } from "../components/login/loginoption";
import { SignInOption } from "../components/login/siginopiton";
import "./loginpage.css"
import loginImg from "../assets/undraw_forgot-password_nttj.svg"
import signinImg from "../assets/undraw_login_weas.svg"


export function LoginPage(){
    const [isLogin, setiIsLogin] = useState(true)

    function handleMouseMove(e){
    const rect = e.currentTarget.getBoundingClientRect()

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    e.currentTarget.style.setProperty("--x", `${x}%`)
    e.currentTarget.style.setProperty("--y", `${y}%`)
    }

    return(
        <div className={`Background-class ${isLogin?"login":"signin"}`} onMouseMove={(e)=>handleMouseMove(e)} >
            <div className="panel-left">
              <LoginOption setiIsLogin={setiIsLogin} />
            </div>

            <div className="panel-right">
              <SignInOption setiIsLogin={setiIsLogin} />
            </div>

            <div className="slideTransisiUngu-class" >
                <img src={loginImg} alt="" />
                <img src={signinImg} alt="" />
            </div>
        </div>
    )
}


