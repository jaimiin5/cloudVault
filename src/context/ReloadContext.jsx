/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const ReloadContext = createContext();

export const UseReload = () => {
  return useContext(ReloadContext);
};

export const ReloadProvider = ({ children }) => {
  const [reload, setReload] = useState(0);

  const triggerReload = () => {
    console.log('called?')
    setReload((prevReload) => prevReload + 1);
  };
  return (
    <ReloadContext.Provider value={{ reload, triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};
