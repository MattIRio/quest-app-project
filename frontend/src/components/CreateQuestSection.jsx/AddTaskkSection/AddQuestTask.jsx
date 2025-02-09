import { TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { ChoiceAnswer } from "./ChoiceAnswer";
import { AnswerTypeSelector } from "./AnswerTypeSelector";
import { useTaskChoices } from "../../../hooks/AddTasksForm/useTaskChoises";
import { MultimediaInput } from "./MultimediaInput";
import { TrueFalseAnswer } from "./TrueFalseAnswer";
import { FreeAnswer } from "./FreeAnswer";
import { MyButton } from "../../../UI/button/MyButton";

export default function AddQuestTask({ task, onUpdateTask }) {
   const [answerType, setAnswerType] = useState(task?.answerType || "choice");
   const [title, setTitle] = useState(task?.title || "");
   const [description, setDescription] = useState(task?.description || "");
   const { choices, correctAnswer, setCorrectAnswer, handleChoiceChange, addChoice, removeChoice } = useTaskChoices();


   const handleSubmitTask = () => {
      const updatedTask = {
         id: task?.id, // якщо task є, використовуємо його id
         title,
         description,
         answerType,
         correctAnswer,
         choices,
      };
      onUpdateTask(updatedTask.id, updatedTask); // Викликаємо функцію для оновлення таски
   };

   const answerComponents = useMemo(() => ({
      choice: (
         <ChoiceAnswer
            choices={choices}
            correctAnswer={correctAnswer}
            onChoiceChange={handleChoiceChange}
            onAddChoice={addChoice}
            onRemoveChoice={removeChoice}
            onSelectCorrect={setCorrectAnswer}
         />
      ),
      trueFalse: <TrueFalseAnswer correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} />,
      freeAnswer: <FreeAnswer correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} />
   }), [choices, correctAnswer, addChoice, answerType]);

   return (
      <div style={{ border: "1px solid #000", margin: 10, borderRadius: 15 }}>
         <div style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px" }}>
            <h2>Task {task.id}</h2>
            <TextField
               label="Title"
               type="text"
               style={{ borderRadius: 30 }}
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
               label="Description"
               multiline
               minRows={3}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <MultimediaInput />
            <h3>Тип відповіді</h3>
            <AnswerTypeSelector answerType={answerType} onChange={setAnswerType} />
            {answerComponents[answerType]}
            <MyButton onClick={handleSubmitTask} text={"Submit Task"}></MyButton>
         </div>
      </div>
   );
}
