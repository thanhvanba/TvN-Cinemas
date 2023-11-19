import './App.css'
import Router from './routes'
import { useContext, useEffect } from "react"
import { UserContext } from './context/UserContext';

function App() {
  // effect
  const { user, info, login, register } = useContext(UserContext);
  console.log(">>> user", user, ">>> info", info)

  useEffect(()=>{
    if(localStorage.getItem("token")){
      login(localStorage.getItem("username"), localStorage.getItem("token"), localStorage.getItem("refreshToken"))
    }
  }, []);

  useEffect(()=>{
    if(localStorage.getItem("email")){
      register(localStorage.getItem("email"), localStorage.getItem("fullname"), localStorage.getItem("phone"))
    }
  }, []);
  return (
    <div style={{"background": "url(../src/images/movie-details-bg.jpg)", "background-attachment": "fixed"}}>
        <Router/>
    </div>
  )
}

export default App