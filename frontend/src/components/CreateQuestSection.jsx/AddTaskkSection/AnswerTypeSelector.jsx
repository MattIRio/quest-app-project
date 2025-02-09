import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export function AnswerTypeSelector({ answerType, onChange }) {
   return (
      <RadioGroup
         aria-label="options"
         name="options"
         value={answerType || "choice"}
         onChange={(e) => onChange(e.target.value)}
         style={{ display: "flex", flexDirection: "row" }}
      >
         <FormControlLabel value="choice" control={<Radio />} label="Choice" />
         <FormControlLabel value="trueFalse" control={<Radio />} label="True/False" />
         <FormControlLabel value="freeAnswer" control={<Radio />} label="Free answer" />
      </RadioGroup>
   );
}
