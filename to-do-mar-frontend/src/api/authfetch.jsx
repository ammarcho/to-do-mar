
import { useNavigate } from "react-router-dom";


export function useAuthFetch() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("tokenAccess");
    navigate("/login");
  }

  async function authFetch(url, options = {}) {
    let token = localStorage.getItem("tokenAccess");

    // kirim Authorization HANYA jika token ada
    let res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    // jika bukan 401, kembalikan response
    if (res.status !== 401) return res;

    // 401 → coba refresh token
    const refreshRes = await fetch("http://localhost:3000/refresh", {
      method: "POST",
      credentials: "include",
    });

    // refresh gagal → logout jika sebelumnya ada token
    if (!refreshRes.ok) {
      if (token) logout();
      return res;
    }

    // refresh sukses → simpan access token baru
    const data = await refreshRes.json();
    token = data.newTokenAccess;
    localStorage.setItem("tokenAccess", token);

    // ulangi request dengan access token baru
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    return res;
  }

  return authFetch;
}
