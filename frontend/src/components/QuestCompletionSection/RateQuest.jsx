import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { MyButton } from "../../UI/button/MyButton";

export default function RateQuest({ onSubmit }) {
   const [rating, setRating] = useState(0);

   const handleSubmit = () => {
      if (rating > 0) {
         onSubmit(rating);
      }
   };

   return (
      <Container style={{ display: "flex", gap: 20, flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "20px" }}>
         <Typography variant="h6">Оцініть квест</Typography>
         <Rating
            name="quest-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
         />
         <MyButton
            onClick={handleSubmit}
            style={{ marginTop: "10px" }}
            text={"Надіслати"}
         >

         </MyButton>
      </Container>
   );
}
