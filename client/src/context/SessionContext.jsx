import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext); // every component will access the store using this hook

export const SessionProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if(storedUser){
        setUser(storedUser)
        setIsLoggedIn(true)
      }
      setLoading(false)
    }, [])
    
    
    const login = (userData) =>{
        setIsLoggedIn(true);
        setUser(userData)
        sessionStorage.setItem("user", JSON.stringify(userData))
    }
    const logout = (data) =>{
        if(data) {
        setIsLoggedIn(false);
        setUser(null)
        sessionStorage.removeItem("user")
        }
        
    }
    return (
        <SessionContext.Provider value={{isLoggedIn, user, loading, login, logout}}>{children}</SessionContext.Provider>
    )
}
//Context is called dependency injection.


