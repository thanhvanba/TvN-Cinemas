import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import Home from './components/Home'
import Movie from './components/Movie'
import ShowTimes from './components/ShowTimes'
import OrderMovie from './components/OrderMovie'
import Header from './components/Header'

function App() {
  // effect

  return (
    <div style={{"background": "url(../src/images/movie-details-bg.jpg)", "background-attachment": "fixed"}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home' element={<Header   />} />
          <Route path='/dangchieu' element={<Home />} />
          <Route path='/sapchieu' element={<Home />} />
          <Route path='/dacbiet' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/thanhvien' element={<Signup />} />
          <Route path='/quydinh' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/showtimes' element={<ShowTimes/>} />
          <Route path='/showtimes/lichchieuphim' element={<ShowTimes/>} />
          <Route path='/showtimes/phimtheorap' element={<ShowTimes/>} />
          <Route path='/order' element={<OrderMovie/>} />
          <Route path='/order/chonghe' element={<OrderMovie/>} />
          <Route path='/order/bapnuoc' element={<OrderMovie/>} />
          <Route path='/order/xacnhan' element={<OrderMovie/>} />
          <Route path='/order/ve' element={<OrderMovie/>} />
        </Routes>
    </div>
  )
}

export default App