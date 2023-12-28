import './App.css'
import Admin from './page/admin/index.jsx'
import Header from './components/Header'
import Footer from './components/Footer/index.jsx'
import Signup from './page/Signup/index.jsx'
import bg from "./images/movie-details-bg.jpg"

import { AdminRouter, MainRouter, AppRouter } from './routes'
import { useContext, useEffect } from "react"
import { RegisterContext } from './context/RegisterContext';
import { LoginContext } from './context/LoginContext';
import { jwtDecode } from 'jwt-decode'
import { useLocation } from 'react-router-dom'

function App() {
  const { pathname } = useLocation()
  // effect
  const { info, register } = useContext(RegisterContext);
  const { user, login } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));
      login(localStorage.getItem("username"), localStorage.getItem("token"), localStorage.getItem("refreshToken"), decode.role)
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      register(localStorage.getItem("email"), localStorage.getItem("fullname"), localStorage.getItem("phone"))
    }
  }, []);
  return (
    <div>
      {
        (user.role === "ADMIN" || user.role === "MANAGER") ? (
          <AdminRouter />
        ) : (
          (pathname === "/user/payment-success" || pathname === "/reset-password" || pathname === "/booking-timeout") ? (
            <MainRouter />
          ) : (
            <div style={{ background: `url(${bg})`, backgroundAttachment: "fixed" }}>
              <Header />
              <MainRouter />
              <Footer />
            </div>
          )
        )
      }
    </div>
  )
}

export default App