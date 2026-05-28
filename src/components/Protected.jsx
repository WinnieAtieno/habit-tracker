import React, { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Auth from '../pages/Auth'
import { useAuth } from '../context/AuthContext'

function Protected() {
    const {token} = useAuth()
    const location = useLocation()

     if(!token){
        return <Navigate
         to="/auth" 
         replace 
         state={{
            message:"Authentication required",
            from:location.pathname
        }}/> 
    }
  return (
  //  returns all the protected pages
    <Outlet/>
  )
} 

export default Protected