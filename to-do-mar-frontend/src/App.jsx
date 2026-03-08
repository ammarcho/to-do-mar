import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToDoPage } from './pages/todopage'
import { LoginPage } from './pages/loginpage'
import { AuthProvider } from "./hooks/authcontext";
import { ProfilePage } from "./pages/profilepage";




function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ToDoPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
