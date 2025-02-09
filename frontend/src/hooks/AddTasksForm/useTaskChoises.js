import { useState } from "react";

export function useTaskChoices() {
   const [choices, setChoices] = useState([""]);
   const [correctAnswer, setCorrectAnswer] = useState("");

   const handleChoiceChange = (index, value) => {
      const newChoices = [...choices];
      newChoices[index] = value;
      setChoices(newChoices);
   };

   const addChoice = () => setChoices([...choices, ""]);

   const removeChoice = (index) => {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
      if (correctAnswer === choices[index]) setCorrectAnswer("");
   };

   return { choices, correctAnswer, setCorrectAnswer, handleChoiceChange, addChoice, removeChoice };
}
