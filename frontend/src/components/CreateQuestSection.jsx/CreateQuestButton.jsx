import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CreateQuestButton() {
   return (
      <>
         <Button
            component={Link}
            to="/create_quest" // Шлях для сторінки створення квесту
            style={{
               background: "#394786",
               borderRadius: 20,
               color: "white",
               flex: "1 1 100%"
            }}>
            <Typography> + Create quest</Typography>
         </Button>
      </>

   )
}