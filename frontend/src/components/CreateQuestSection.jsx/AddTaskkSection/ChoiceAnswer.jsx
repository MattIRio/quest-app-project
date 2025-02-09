import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

export function ChoiceAnswer({
   choices,
   correctAnswer,
   onChoiceChange,
   onAddChoice,
   onRemoveChoice,
   onSelectCorrect
}) {
   return (
      <Box display="flex"
         gap={2}
         flexDirection="column" >
         <h3>Варіанти відповіді:</h3>
         {choices.map((choice, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
               <TextField label={`Варіант ${index + 1}`} value={choice} onChange={(e) => onChoiceChange(index, e.target.value)} />
               <Button onClick={() => onRemoveChoice(index)} variant="outlined" color="error">
                  X
               </Button>
            </div>
         ))}
         <Button onClick={onAddChoice} variant="outlined" >Додати варіант</Button>

         <h3>Оберіть правильну відповідь:</h3>
         <Select value={correctAnswer} onChange={(e) => onSelectCorrect(e.target.value)} fullWidth disabled={choices.length === 0}>
            {choices.map((choice, index) => (
               <MenuItem key={index} value={choice}>{choice}</MenuItem>
            ))}
         </Select>
      </Box>
   );
}