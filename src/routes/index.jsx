import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Signup from '../page/Signup';
import Movie from '../components/Movie';
import ShowTimes from '../components/ShowTimes';
import OrderMovie from '../components/OrderMovie';
import Admin from '../page/admin';
import Info from '../page/Info'
import VerifyOTP from '../utils/verifyOTP';
import Navigate from '../utils/Navigate';
import Movies from '../components/Movies';
import Cinemas from '../components/Cinemas';

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/phim/dangchieu" element={<Home />} />
    <Route path="/phim/sapchieu" element={<Home />} />
    <Route path='/dacbiet' element={<Home />} />
    <Route path="/phim" element={<Movies />} />
    <Route path="/tim-kiem/:keyWord" element={<Movies />} />
    <Route path="/rap" element={<Cinemas />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/signup/verify' element={<Signup />} />
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
    <Route path="/user/history-booking" element={<Info />} />
    <Route path="/user/payment-success" element={<Navigate />} />
    <Route path="/reset-password" element={<Navigate />} />
    <Route path="/forgot-password/verify" element={<VerifyOTP />} />
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
