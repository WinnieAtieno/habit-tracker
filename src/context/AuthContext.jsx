import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)


function AuthProvider({children}) {
    const [token, setToken] = useState(()=> localStorage.getItem("token"))
    const [user, setUser]= useState(null)
    
    useEffect(()=>{
        if(token){
            localStorage.setItem("token", token)
        }else{
            localStorage.removeItem("token")
        }
    },[token])
      const login = (userToken) => {
        setToken(userToken)
       
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }
  return (
    <AuthContext.Provider value={{token, user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
    return useContext(AuthContext)
}
export {AuthProvider, useAuth}
export default AuthContext