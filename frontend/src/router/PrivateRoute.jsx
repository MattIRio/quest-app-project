import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = ({ routePage }) => {
   const { isAuthenticated } = useSelector(state => state.auth)
   const token = localStorage.getItem("accessToken")
   const location = useLocation()
   return (
      <>
         {(isAuthenticated || token) ? routePage : <Navigate to={"/auth"} state={{ from: location }} />}
      </>
   )
}

export default PrivateRoute;