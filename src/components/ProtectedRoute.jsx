import React from 'react'
  import { Navigate,Outlet } from 'react-router-dom'
  
  const ProtectedRoute = ({isLogged}) => {
    //console.log("Esta loggeado?:",isLogged)
    if(isLogged){
        return <Outlet />
    }else{
        return <Navigate />
    }
    return (
      <div>ProtectedRoute</div>
    )
  }
  
  export default ProtectedRoute

