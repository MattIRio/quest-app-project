import { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { z } from "zod";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function DataField({ data, style }) {

   const emailSchema = z.string().email({ message: "Невірний формат email" });
   const userShema = z.string()
      .min(3, { message: "Нікнейм має містити щонайменше 3 символи" })
      .max(50, { message: "Нікнейм не може перевищувати 50 символів" });


   const [inputData, setInputData] = useState(data);
   const [isEdit, setIsEdit] = useState(false);

   const handleNicknameSubmit = () => {
      switch (style) {
         case "email":
            if (emailSchema.safeParse(inputData).success) {
               setIsEdit(false);
            }
            break;
         case "nickname":
            if (userShema.safeParse(inputData).success) {
               setIsEdit(false);
            }
            break;
      }
   }
   return (
      isEdit ? (
         <Box display="flex" alignItems="center" >
            <TextField
               fullWidth
               value={inputData}
               onChange={(e) => setInputData(e.target.value)}
               size="small"
            />
            <IconButton onClick={handleNicknameSubmit} color="primary">
               <CheckRoundedIcon />
            </IconButton>
            <IconButton onClick={() => setIsEdit(false)}>
               <ClearRoundedIcon />
            </IconButton>
         </Box>
      ) : (
         <Box display="flex" alignItems="center"  >
            <Typography variant={style === 'nickname' ? 'h5' : 'h6'}>{inputData}</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
               <EditRoundedIcon />
            </IconButton>
         </Box>
      )
   );

}