import './App.css'
import Router from './routes'
import { useContext, useEffect } from "react"
import { UserContext } from './context/UserContext';

function App() {
  // effect
  const { user, login } = useContext(UserContext);
  console.log(">>> user", user)

  useEffect(()=>{
    if(localStorage.getItem("token")){
      login(localStorage.getItem("username"), localStorage.getItem("token"), localStorage.getItem("refreshToken"))
    }
  }, [])
  return (
    <div style={{"background": "url(../src/images/movie-details-bg.jpg)", "background-attachment": "fixed"}}>
        <Router/>
    </div>
  )
}

export default App