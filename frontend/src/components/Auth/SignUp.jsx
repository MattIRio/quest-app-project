import { useState } from "react"

import { authService } from "../../services/authService";
import { MyButton } from "../../UI/button/MyButton.jsx";
import MyInput from "../../UI/input/MyInput.jsx"
import { useNavigate } from "react-router-dom";



export const SignUp = () => {

   const [userData, setUserData] = useState({
      userName: "",
      email: "",
      password: ""
   });
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prev) => ({ ...prev, [name]: value }));
   };

   const [signUp, { isLoading }] = authService.useSignUpMutation();
   const [signOut] = authService.useSignOutMutation();

   const handleRegistration = async () => {
      try {
         const data = await signUp(userData).unwrap();
         console.log(data)
         redirectOnAuth()
      } catch (err) {
         console.error("Failed to register:", err);
      }
   };

   const handleLogout = async () => {
      try {
         await signOut('').unwrap();

      } catch (err) {
         console.error("Failed to log out:", err);
      }
   };

   if (isLoading) return <>Loading...</>;

   return (
      <div className="authForm__item">
         <MyInput
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
         />
         <MyInput
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Password"
         />
         <MyInput
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            placeholder="Username"
         />
         <MyButton text="Зареєструватись" onClick={handleRegistration} />
         <MyButton text="Вийти" onClick={handleLogout} />
      </div>
   );
}
