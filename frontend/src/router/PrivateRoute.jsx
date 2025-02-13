import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = ({ routePage }) => {

   const isAuthenticated = localStorage.getItem("username")
   return (
      <>
         {(isAuthenticated) ? routePage : <Navigate to={"/auth"} state={{ from: "/main" }} />}
      </>
   )
}

export default PrivateRoute;