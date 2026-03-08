import "./header.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authcontext";
import akunImg from "../../assets/account_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"

export function Header({ setModeSorBy, setSearchQuery }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  if (loading) return null;

  function handleHome() {
    setModeSorBy("sortByInput");
    setSearchQuery("");
  }

  function handleAkun() {
    if(!user || !user.username){
      navigate("/login");
      return
    }

    navigate("/profile")
  }

  let displayName = "Guest";

  if (loading) {
    displayName = "Loading...";} 
  else if (user && user.username) {
    displayName = user.username;
  }

  return (
    <div className="header-class ">
      <h1 className="title-class gradient-text " onClick={handleHome}>
        TO-DO-MAR
      </h1>

      <div className="akun-class">
        <img src={akunImg} alt="" className="imageAkun-class" onClick={handleAkun}/>
        <button className="namaAkun-class" onClick={handleAkun}>
          {displayName}
        </button>
      </div>
    </div>
  );
}


