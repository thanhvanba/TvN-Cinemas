import './App.css'
import Admin from './page/admin/index.jsx'
import Header from './components/Header'
import Footer from './components/Footer/index.jsx'
import Signup from './page/Signup/index.jsx'
import bg from "./images/movie-details-bg.jpg"

import { AdminRouter, MainRouter, AppRouter, StaffRouter } from './routes'
import { useContext, useEffect, useState } from "react"
import { RegisterContext } from './context/RegisterContext';
import { LoginContext } from './context/LoginContext';
import { jwtDecode } from 'jwt-decode'
import { useLocation } from 'react-router-dom'
import Modal from './utils/Modal.jsx'
import axiosService from './service/axiosInstance.js'

function App() {
  const { pathname } = useLocation()
  // effect
  const { info, register } = useContext(RegisterContext);
  const { user, login } = useContext(LoginContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));
      login(localStorage.getItem("username"), localStorage.getItem("token"), localStorage.getItem("refreshToken"), decode.role, decode.sub)
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      register(localStorage.getItem("email"), localStorage.getItem("fullname"), localStorage.getItem("phone"))
    }
  }, []);

  // Xử lý hiển thị thông báo khi phiên đăng nhập hết hạn
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    window.location.href = '/signup';
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const axios = axiosService(openModal);
  return (
    <div>
      {
        (user.role === "ADMIN" || user.role === "MANAGER") ? (
          <AdminRouter />
        ) :
          user.role === "STAFF" ?
            <StaffRouter /> : (
              (pathname === "/user/payment-success" || pathname === "/reset-password" || pathname === "/booking-timeout") ? (
                <MainRouter />
              ) :
                (
                  <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed" }}>
                    <Header />
                    <MainRouter />
                    <Footer />
                  </div>
                )
            )
      }
      {/* <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirmModal}
        title='Phiên đăng nhập đã hết hạn'
        content='Vui lòng đăng nhập lại để tiếp tục.'
        buttonName='Đồng ý'
        buttonCancel=''
      /> */}
    </div>
  )
}

export default App