// import React from 'react'
// import { Routes, Route } from 'react-router-dom'

// import Home from '../components/Home'
// import Signup from '../page/Signup'
// import Movie from '../components/Movie'
// import ShowTimes from '../components/ShowTimes'
// import OrderMovie from '../components/OrderMovie'
// import Admin from '../page/admin'
// import AddItem from '../page/admin/AddItem'

// const routers = [
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/home',
//     element: <Home />
//   },
//   {
//     path: '/home',
//     element: <Header />
//   },
//   {
//     path: '/phim/dangchieu',
//     element: <Home />
//   },
//   {
//     path: '/phim/sapchieu',
//     element: <Home />
//   },
//   {
//     path: '/dacbiet',
//     element: <Home />
//   },
//   {
//     path: '/signup',
//     element: < Signup />
//   },
//   {
//     path: '/signup/verify',
//     element: < Signup />
//   },

//   {
//     path: '/thanhvien',
//     element: < Signup />
//   },
//   {
//     path: '/quydinh',
//     element: < Signup />
//   },
//   {
//     path: '/movie',
//     element: < Movie />
//   },
//   {
//     path: '/showtimes',
//     element: < ShowTimes />
//   },
//   {
//     path: '/showtimes/lichchieuphim',
//     element: < ShowTimes />
//   },
//   {
//     path: '/showtimes/phimtheorap',
//     element: < ShowTimes />
//   },
//   {
//     path: '/order',
//     element: < OrderMovie />
//   },
//   {
//     path: '/order/chonghe',
//     element: < OrderMovie />
//   },
//   {
//     path: '/order/bapnuoc',
//     element: < OrderMovie />
//   },
//   {
//     path: '/order/ve',
//     element: < OrderMovie />
//   },
//   {
//     path: '/admin/dashboard',
//     element: < Admin />
//   },
//   {
//     path: '/admin/list-user',
//     element: < Admin />
//   },
//   {
//     path: '/admin/list-showtime',
//     element: < Admin />
//   },
// ];

// const Router = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/phim/dangchieu' element={<Home />} />
//       <Route path='/phim/sapchieu' element={<Home />} />
//       <Route path='/dacbiet' element={<Home />} />
//       <Route path='/signup' element={<Signup />} />
//       <Route path='/signup/verify' element={<Signup />} />
//       <Route path='/thanhvien' element={<Signup />} />
//       <Route path='/quydinh' element={<Signup />} />
//       <Route path='/movie/:id' element={<Movie />} />
//       <Route path='/showtimes' element={<ShowTimes />} />
//       <Route path='/showtimes/lichchieuphim' element={<ShowTimes />} />
//       <Route path='/showtimes/phimtheorap' element={<ShowTimes />} />
//       <Route path='/order' element={<OrderMovie />} />
//       <Route path='/order/chonghe' element={<OrderMovie />} />
//       <Route path='/order/bapnuoc' element={<OrderMovie />} />
//       <Route path='/order/xacnhan' element={<OrderMovie />} />
//       <Route path='/order/ve' element={<OrderMovie />} />
//       <Route path='/admin' element={<Admin />} />
//       <Route path='/admin/dashboard' element={<Admin />} />
//       <Route path='/admin/list-user' element={<Admin />} />
//       <Route path='/admin/list-showtime' element={<Admin />} />
//       <Route path='/admin/list-movie' element={<Admin />} />
//       <Route path='/admin/list-cinemas' element={<Admin />} />
//       <Route path='/admin/list-review' element={<Admin />} />
//       <Route path='/admin/add-item/:item' element={<Admin />} />
//     </Routes>

//   )
// }

// export default Router

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Signup from '../page/Signup';
import Movie from '../components/Movie';
import ShowTimes from '../components/ShowTimes';
import OrderMovie from '../components/OrderMovie';
import Admin from '../page/admin';
import Info from '../page/Info'
import Navigate from '../utils/Navigate';

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/phim/dangchieu" element={<Home />} />
    <Route path="/phim/sapchieu" element={<Home />} />
    <Route path='/dacbiet' element={<Home />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/signup/verify' element={<Signup />} />
    <Route path='/forgot-password/verify' element={<Signup />} />
    <Route path='/thanhvien' element={<Signup />} />
    <Route path='/quydinh' element={<Signup />} />
    <Route path='/movie/:id' element={<Movie />} />
    <Route path='/showtimes' element={<ShowTimes />} />
    <Route path='/showtimes/lichchieuphim' element={<ShowTimes />} />
    <Route path='/showtimes/phimtheorap' element={<ShowTimes />} />
    <Route path='/:showtimeId/order' element={<OrderMovie />} />
    <Route path='/:showtimeId/order/chonghe' element={<OrderMovie />} />
    <Route path='/:showtimeId/order/bapnuoc' element={<OrderMovie />} />
    <Route path='/:showtimeId/order/xacnhan' element={<OrderMovie />} />
    <Route path='/:showtimeId/order/ve' element={<OrderMovie />} />
    <Route path="/user/info" element={<Info />} />
    <Route path="/user/navigate" element={<Navigate />} />
  </Routes>
);

const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Admin />} />
    <Route path="/admin/:item" element={<Admin />} />
    <Route path="/admin/add-item/:item" element={<Admin />} />
    {/* <Route path="/admin/add-item/movie" element={<Admin />} />
    <Route path="/admin/add-item/showtime" element={<Admin />} /> */}
    <Route path="/admin/update-item/showtime/:showtimeId" element={<Admin />} />
    <Route path="/admin/update-item/movie/:movieId" element={<Admin />} />
    <Route path="/admin/update-item/cinema/:cinemaId" element={<Admin />} />
    <Route path="/admin/update-item/room/:roomId" element={<Admin />} />
    <Route path="/admin/update-item/food/:foodId" element={<Admin />} />
    <Route path="/admin/update-item/ticket/:ticketId" element={<Admin />} />

    <Route path="/admin/showtime/:showtimeId" element={<Admin />} />
    <Route path="/admin/movie/:movieId" element={<Admin />} />
    <Route path="/admin/cinema/:cinemaId" element={<Admin />} />
    <Route path="/admin/room/:roomId" element={<Admin />} />
    <Route path="/admin/food/:foodId" element={<Admin />} />
    <Route path="/admin/ticket/:ticketId" element={<Admin />} />

    <Route path="/admin/info" element={<Admin />} />
    <Route path="/admin/navigate" element={<Navigate />} />

    <Route path="/manager/:item" element={<Admin />} />
    <Route path="/manager/add-item/:item" element={<Admin />} />
    {/* <Route path="/manager/add-item/movie" element={<Admin />} />
    <Route path="/manager/add-item/showtime" element={<Admin />} /> */}
    <Route path="/manager/update-item/showtime/:showtimeId" element={<Admin />} />
    <Route path="/manager/update-item/movie/:movieId" element={<Admin />} />
    <Route path="/manager/update-item/cinema/:cinemaId" element={<Admin />} />
    <Route path="/manager/update-item/room/:roomId" element={<Admin />} />
    <Route path="/manager/update-item/ticket/:ticketId" element={<Admin />} />

    <Route path="/manager/showtime/:showtimeId" element={<Admin />} />
    <Route path="/manager/movie/:movieId" element={<Admin />} />
    <Route path="/manager/cinema/:cinemaId" element={<Admin />} />
    <Route path="/manager/room/:roomId" element={<Admin />} />
    <Route path="/manager/food/:foodId" element={<Admin />} />
    <Route path="/manager/ticket/:ticketId" element={<Admin />} />

    <Route path="/manager/info" element={<Admin />} />
    <Route path="/manager/navigate" element={<Navigate />} />
  </Routes>
);

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainRouter />} />
      <Route path="/auth/*" element={<MainRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  </Router>
);

export { AppRouter, AdminRouter, MainRouter };
