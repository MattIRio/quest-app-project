import { TextField } from "@mui/material";

export function FreeAnswer({ correctAnswer, setCorrectAnswer }) {
   return <TextField label="Очікувана відповідь" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} fullWidth />;
}