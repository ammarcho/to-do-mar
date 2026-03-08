import "./wrapperProfileKiri.css"
import akunImg from "../../assets/account_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
import { useAuth } from "../../hooks/authcontext"
import { useNavigate } from "react-router-dom";


export function WrapperProfileKiri(){
    const navigate =useNavigate()
    const {user,loading,setUser} = useAuth()

    let displayName = "Guest";

    if (loading) {
      displayName = "Loading...";} 
    else if (user && user.username) {
      displayName = user.username;
    }
  async function handleLogOut() {
    const res = await fetch("http://localhost:3000/logout",{
      method:"POST",
      credentials:"include"
    })
    if(res.ok){
      localStorage.removeItem("tokenAccess")
      setUser(null)
      navigate("/login")
    }
  }

    function handleKeHome(){
        navigate("/")
    }
    return(
        <div className="wrapperProfileKiri-class">
            <div className="kontenProfileKiri-class">
                <img src={akunImg} alt="" className="profileImg-class"/>
                <div className="usernameProfile-class">
                    <h2>{displayName}</h2>
                </div>
            </div>

            <div className="buttonKeHome" onClick={handleKeHome}><span class="material-symbols-outlined">arrow_back</span></div>
            <div className="buttonLogOut" onClick={handleLogOut}>Log Out</div>
        </div>
    )
}