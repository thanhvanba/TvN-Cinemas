import React from "react";

// @function  UserContext
const UserContext = React.createContext({ credentialId: '', auth: false, email: '', fullname: '', phone: '' });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ credentialId: '', auth: false });
  const [info, setUserInfo] = React.useState({ email: '', fullname: '', phone: '' });

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

  const login = (credentialId, token, refreshToken) => {
    setUser(() => ({
      credentialId: credentialId,
      auth: true,
    }));

    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("username", credentialId)
  };

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("username")
    setUser(() => ({
      credentialId: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, info, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };