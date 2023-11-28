import './App.css'
import Admin from './page/admin/index.jsx'
import Header from './components/Header'
import Footer from './components/Footer/index.jsx'
import Signup from './page/Signup/index.jsx'

import Router from './routes'
import { useContext, useEffect } from "react"
import { RegisterContext } from './context/RegisterContext';
import { LoginContext } from './context/LoginContext';
import { jwtDecode } from 'jwt-decode'

function App() {
  // effect
  const { info, register } = useContext(RegisterContext);
  const { user, login } = useContext(LoginContext);
  console.log(">>> user", user, ">>> info", info)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));
      login(localStorage.getItem("username"), localStorage.getItem("token"), localStorage.getItem("refreshToken"), decode.role)
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      //console.log("🚀 ~ file: App.jsx:20 ~ useEffect ~ email:", email)
      register(localStorage.getItem("email"), localStorage.getItem("fullname"), localStorage.getItem("phone"))
    }
  }, []);
  return (
    <div>
      {
        (user.role === "ADMIN" || user.role === "MANAGER")
          ?
          <Admin />
          :
          <div style={{ background: "url(../src/images/movie-details-bg.jpg)", backgroundAttachment: "fixed" }}>
            <Header />
            <Router />
            <Footer />
          </div>
      }
    </div>
  )
}

export default App