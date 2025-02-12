import { useNavigate } from "react-router-dom";

export const useRedirectToMain = () => {
   const navigate = useNavigate();
   const redirect = () => {
      navigate(-1);
   };

   return redirect;
};
