import { Navigate ,Outlet} from "react-router-dom"
import React from "react";

const ProtectedRoute=(props)=>{
    return(
        props.isUserAuthenticated ?<Outlet/>:<Navigate to="/"/>
    );
}
export default ProtectedRoute