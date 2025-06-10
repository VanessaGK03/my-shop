import { createContext, useState } from "react";

export let authContext = createContext(false);

export default function AuthProvider({ children }) {
  const [currentUserLogged, setUser] = useState(() => {
    if(localStorage.getItem("user")){
      return {...JSON.parse(localStorage.getItem("user")), isLogged:true};
    }
    return {isLogged:false}
  })
  return <authContext.Provider value={{currentUserLogged,setUser}}>{children}</authContext.Provider>;
}
