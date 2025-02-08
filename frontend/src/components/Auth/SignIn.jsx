import { useState } from "react"

import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { authService } from "../../services/authService";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput.jsx"


export const SignIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const redirectOnAuth = useRedirectOnAuth();

   // Використовуємо useLazyQuery для відкладеного виклику
   const [signIn, { data, error, isLoading }] = authService.useLazySignInQuery();

   const handleLogin = async () => {
      try {
         const { data } = await signIn({ email, password }); // викликаємо запит
         console.log(data);
         redirectOnAuth(); // редірект після успішної автентифікації
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
