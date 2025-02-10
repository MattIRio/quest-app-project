import { useNavigate, useLocation } from "react-router-dom";

export const useRedirectOnAuth = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const redirectOnAuth = () => {
      const from = location.state?.from?.pathname;
      console.log(from)
      navigate(from);
   };

   return redirectOnAuth;
};
