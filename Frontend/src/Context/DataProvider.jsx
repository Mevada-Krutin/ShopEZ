import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

 const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("account") || "");

  // Save account to localStorage when it changes
  useEffect(() => {
    if (account) {
      localStorage.setItem("account", account);
    } else {
      localStorage.removeItem("account");
    }
  }, [account]);

  // ✅ Add logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    setAccount("");
  };

  return (
    <DataContext.Provider value={{ account, setAccount, logout }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider