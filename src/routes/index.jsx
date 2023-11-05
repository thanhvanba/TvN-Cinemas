import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../components/Home'
import Signup from '../page/Signup'
import Movie from '../components/Movie'
import ShowTimes from '../components/ShowTimes'
import OrderMovie from '../components/OrderMovie'
import Header from '../components/Header'

const Router = () => {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home' element={<Header   />} />
          <Route path='/phim/dangchieu' element={<Home />} />
          <Route path='/phim/sapchieu' element={<Home />} />
          <Route path='/dacbiet' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/verify' element={<Signup />} />
          <Route path='/thanhvien' element={<Signup />} />
          <Route path='/quydinh' element={<Signup />} />
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
    
  )
}

export default Router
