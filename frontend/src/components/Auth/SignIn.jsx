import { useState } from "react"

import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { authService } from "../../services/authService";
import { MyButton } from "../../UI/button/MyButton.jsx";
import MyInput from "../../UI/input/MyInput.jsx"


export const SignIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const redirectOnAuth = useRedirectOnAuth();

   const [signIn, { isLoading }] = authService.useSignInMutation();

   const handleLogin = async () => {
      try {
         const { data } = await signIn({ email, password }); // викликаємо запит
         console.log(data);
         redirectOnAuth();
      } catch (err) {
         console.error('Failed to sign in:', err);
      }
   };

   if (isLoading) return <>Loading.........................</>

   return (
      <div className="authForm__item">
         <MyInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
         />
         <MyInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
         />
         <MyButton text="Увійти" onClick={handleLogin} />
      </div>
   )
}
