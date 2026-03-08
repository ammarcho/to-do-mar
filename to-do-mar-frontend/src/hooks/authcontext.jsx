import { createContext, useContext, useEffect, useState } from "react";
import { useAuthFetch } from "../api/authfetch";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const authFetch = useAuthFetch();
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:3000/me");
      if (!res || !res.ok) {
        setUser(null);
        return;
      }
    
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, 
        loading,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
