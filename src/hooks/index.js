import { useEffect } from "react";
import { useContext, useState, createContext  } from "react"
import { useLocation} from 'react-router-dom'
import { isExpired } from 'react-jwt'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const localToken = localStorage.getItem('token');
    const [token, setToken] = useState(localToken)
    const location = useLocation()

    useEffect( () => {
      if (token && isExpired (token)) {
        console.log("expiro")
        localStorage.removeItem('token')
        window.location='/login'
      }
      
    },[location, token])


    return (
      <AuthContext.Provider value={{token, setToken}}>
        {children}
      </AuthContext.Provider>
    )
}
  