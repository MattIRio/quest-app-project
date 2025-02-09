import { MenuItem, Select } from "@mui/material";

export function TrueFalseAnswer({ correctAnswer, setCorrectAnswer }) {
   return (
      <div>
         <h4>Оберіть правильну відповідь:</h4>
         <Select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} fullWidth>
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
         </Select>
      </div>
   );
}