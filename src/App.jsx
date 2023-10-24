import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import Home from './components/Home'
import Movie from './components/Movie'
import ShowTimes from './components/ShowTimes'
import OrderMovie from './components/OrderMovie'

function App() {
  // effect

  return (
    <div style={{"background": "url(../src/images/movie-details-bg.jpg)", "background-attachment": "fixed"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/showtimes/lichchieuphim' element={<ShowTimes/>} />
          <Route path='/showtimes/phimtheorap' element={<ShowTimes/>} />
          <Route path='/order' element={<OrderMovie/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App