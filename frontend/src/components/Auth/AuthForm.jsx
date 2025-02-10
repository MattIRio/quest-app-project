import { useState } from "react"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

import "./AuthForm.css"
import { useNavigate } from "react-router-dom";
import ContainerBlurBg from "../../UI/container/ContainerBlurBg";


const clientId = '506686656331-h9ksh8k52mgd1oo46h3rn0mjstit4nqu.apps.googleusercontent.com';
const githubClientId = "Ov23limIirY4kqAfNKkJ"

const AuthForm = () => {

   const [isSignUp, setIsSignUp] = useState(false)
   const navigate = useNavigate();

   const handleGitHubLogin = () => {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=http://localhost:5173/login/oauth2/code/github&scope=user`;

      window.location.href = githubAuthUrl;
   };
   return (

      <div className="authForm">
         <div className="authForm__buttons">
            <button onClick={() => setIsSignUp(false)} >Вхід</button>
            <button onClick={() => setIsSignUp(true)}>Реєстрація</button>
         </div>
         {
            isSignUp ? <SignUp /> : <SignIn />
         }
         <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
               onSuccess={(response) => {
                  console.log('Success:', response);
               }}
               onError={() => console.log('Login Failed')}
               redirectUri="http://localhost:5173/login/oauth2/code/google"
            />
         </GoogleOAuthProvider>
         <button onClick={handleGitHubLogin} className="oauth-button github-button">Вхід через GitHub</button>
      </div>
   )
}
export default AuthForm