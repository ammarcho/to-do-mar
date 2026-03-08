import { useAuth } from "../../hooks/authcontext";
import "./wrapperProfileKanan.css";
import {motion} from "framer-motion"

export function WrapperProfileKanan() {
  const { loading, user } = useAuth();

  let displayName = "Guest";
  if (loading) displayName = "Loading...";
  else if (user?.username) displayName = user.username;



  return (
    <div className="wrapperProfileKanan-class">
      <div className="kontenProfileKanan-class">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sapaUser-class "
        >
          Hi <span className="brand">{displayName}</span> 👋
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="welcomeUser-class"
        >
          <span className="welcome-line-1">
            Welcome to <span className="brand">TO-DO-MAR</span> 🚀
          </span>
          <span className="welcome-line-2">
            Enjoy our features ✨
          </span>
        </motion.h1>
      </div>


    </div>
  );
}
