import React from "react";
import { createContext, useState } from "react";

// @function  UserContext
const RegisterContext = createContext({email: '', fullname: '', phone: '' });

// @function  UserProvider
// Create function to provide UserContext
const RegisterProvider = ({ children }) => {
  const [info, setUserInfo] = useState({ email: '', fullname: '', phone: '' });

  const register = (email, fullname, phone) => {
    setUserInfo(() => ({
      email: email,
      fullname: fullname,
      phone: phone
    }));

    localStorage.setItem("email", email)
    localStorage.setItem("fullname", fullname)
    localStorage.setItem("phone", phone)
  };


  return (
    <RegisterContext.Provider value={{info, register }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };