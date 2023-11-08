import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './page/admin/index.jsx'
import Header from './components/Header'
import Footer from './components/Footer/index.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {localStorage.getItem("login") === "admin" ? (
        <>
          <Header />
          <App />
          <Footer />
        </>
      ) : (
        <Admin />)
      }
    </BrowserRouter>
  </React.StrictMode>,
)
