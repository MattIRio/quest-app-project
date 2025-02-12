import { Avatar, Box, Button, Grid2, IconButton, styled } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import React, { useState, useRef } from "react";

export default function ChangeAvatar() {
   const [avatar, setAvatar] = useState("/avatar.jpg");
   const avatarRef = useRef(null);
   const StyledAvatar = styled(Avatar)(({ theme }) => ({
      width: 150,
      height: 150,
      cursor: "pointer",
      transition: "opacity 0.3s",
      "&:hover": {
         opacity: 0.8
      }
   }));

   const handleAvatarUpload = (event) => {
      event.preventDefault();
      avatarRef.current.click();
   }

   const handleAvatarChange = () => {
      const newAvatar = avatarRef.current.files[0];
      setAvatar(URL.createObjectURL(newAvatar));
   }

   return (
      <Grid2 >
         <input
            accept="image/*"
            type="file"
            ref={avatarRef}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
         />
         <label htmlFor="avatar-upload">
            <Box >
               <button onClick={handleAvatarUpload}>
                  <StyledAvatar src={avatar} alt="Profile Picture" />
               </button>
            </Box>
         </label>
      </Grid2>
   )

}