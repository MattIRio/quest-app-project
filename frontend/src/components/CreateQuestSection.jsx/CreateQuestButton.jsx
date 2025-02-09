import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CreateQuestButton() {
   return (
      <>
         <Button
            component={Link}
            to="/create_quest" // Шлях для сторінки створення квесту
            style={{
               width: '100%',
               height: '70px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               background: "purple",
               borderRadius: 20,
               color: "white"
            }}
         >
            <Typography fontSize={30}> + Create quest</Typography>
         </Button>
      </>

   )
}