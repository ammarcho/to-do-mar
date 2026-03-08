import { useState } from "react"
import "./signinoption.css"

export function SignInOption({setiIsLogin}){
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")

    async function handleSubmitSignIn(e){
        e.preventDefault()
        setSuccess("")
        setError("")
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        if(!username || !email || !password){
            setError("Field diisi terlebih dahulu 😊")
            return}

        const res = await fetch("http://localhost:3000/register",{
            method:"POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({username,email,password})
        })

        const dataRes = await res.json()

        if(!res.ok){
            setError(dataRes.message)
            return
        }

        setSuccess("Akun berhasil dibuat. Silakan login 😊")
    }

    return(
        <div className="kotakSignIn-class">
            <h1 className="titleSignIn-class">Sign-In</h1>
            <form action="" onSubmit={(e)=>handleSubmitSignIn(e)}>
                <div className="wrapperUsernameSignIn-class">
                    <label htmlFor="">Username</label>
                    <input name="username" type="text" className="usernameSignIn-class" placeholder="Username"/>
                </div>
                <div className="wrapperEmailSignIn-class">
                    <label htmlFor="">Email</label>
                    <input name="email" type="text" className="emailSignIn-class" placeholder="Email"/>
                </div>
                <div className="wrapperPasswordSignIn-class">
                    <label htmlFor="">Password</label>
                    <input name="password" type="password" className="passwordSignIn-class" placeholder="Password"/>
                </div>
                    {error && <p className="error-text">{error}</p>}
                    {success && <p className="success-text">{success}</p>}
                <button className="submitSignIn-class">Create Account</button>
            </form>
            <p className="pindahModeLogin">Have an Account? <span onClick={()=>setiIsLogin(true)}>LogIn</span></p>
        </div>
    )
}