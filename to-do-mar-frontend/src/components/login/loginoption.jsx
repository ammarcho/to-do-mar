import { useState } from "react";
import "./loginoption.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authcontext";
export function LoginOption({setiIsLogin}){
    const navigate = useNavigate()
    const [error,setError]= useState("")
    const {setUser,fetchMe} = useAuth()

    async function handleSubmitLogin(e){
        e.preventDefault()
        setError("")
        const identifier = e.target.identifier.value
        const password = e.target.password.value

        if(!identifier || !password){
            setError("Field diisi terlebih dahulu 😊")
            return
        }
        const res = await fetch ("http://localhost:3000/login",{
            method :"POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({identifier,password}),
            credentials: "include",
        })

        const dataRes = await res.json()

        if(!res.ok){
            setError(dataRes.message)
            return
        }

        localStorage.setItem("tokenAccess",dataRes.tokenAccess)
        setUser({username: dataRes.username,});
        await fetchMe();
        navigate("/")

    }

    return(
        <div className="kotakLogin-class">
            <h1 className="titleLogin-class">Log-In</h1>
            <form action="" onSubmit={(e)=>handleSubmitLogin(e)}>
                <div className="wrapperUsernameEmailLogin-class">
                    <label htmlFor="">Email or Username</label>
                    <input name="identifier" type="text" className="usernameEmailLogin-class" placeholder="Username/Email"/>
                </div>
                <div className="wrapperPasswordLogin-class">
                    <label htmlFor="">Password</label>
                    <input name="password" type="password" className="passwordLogin-class" placeholder="Password"/>
                </div>
                {error && <p className="error-text">{error}</p>}
                <button className="submitLogin-class">Login</button>
            </form>
            <p className="pindahModeSignIn">Don't Have an Account? <span onClick={()=>setiIsLogin(false)}>Sign</span></p>
        </div>
    )
}