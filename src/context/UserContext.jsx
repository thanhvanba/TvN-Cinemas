import React from "react";

// @function  UserContext
const UserContext = React.createContext({ credentialId: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ credentialId: '', auth: false });

  const login = (credentialId, token, refreshToken) => {
    setUser((user) => ({
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
    setUser((user) => ({
      credentialId: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};