import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './page/admin/index.jsx'
import Header from './components/Header'
import Footer from './components/Footer/index.jsx'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        {localStorage.getItem("login") != "admin" ? (
          <>
            <Header />
            <App />
            <Footer />
          </>
        ) : (
          <Admin />)
        }
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
