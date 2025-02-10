import { TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { ChoiceAnswer } from "./ChoiceAnswer";
import { AnswerTypeSelector } from "./AnswerTypeSelector";
import { useTaskChoices } from "../../../hooks/AddTasksForm/useTaskChoises";
import { MultimediaInput } from "./MultimediaInput";
import { TrueFalseAnswer } from "./TrueFalseAnswer";
import { FreeAnswer } from "./FreeAnswer";
import { MyButton } from "../../../UI/button/MyButton";




const TaskType = {
   TEXTWITHCHOICE: "TEXT",
   IMAGEWITHCOORDINATES: "IMAGE",
   VIDEOWITHCHOICE: "VIDEO",
   IMAGEWITHCHOICE: "IMAGEWITHTEXTANSWER",
   TEXTWITHFREEANSWER: "TEXTWITHFREEANSWER",
   IMAGEWITHFREEANSWER: "IMAGEWITHFREEANSWER",
   VIDEOWITHFREEANSWER: "VIDEOWITHFREEANSWER"
};
const determineTaskType = (multimediaStatus, answerType) => {
   switch (true) {
      case multimediaStatus === "hasVideo":
         return answerType === "freeAnswer" ? TaskType.VIDEOWITHFREEANSWER : TaskType.VIDEOWITHCHOICE;
      case multimediaStatus === "hasImage":
         return answerType === "freeAnswer" ? TaskType.IMAGEWITHFREEANSWER : TaskType.IMAGEWITHCHOICE;
      default:
         return answerType === "freeAnswer" ? TaskType.TEXTWITHFREEANSWER : TaskType.TEXTWITHCHOICE;
   }
};

export default function CreateTaskForm({ task, onUpdateTask }) {
   const [answerType, setAnswerType] = useState(task?.answerType || "choice");
   const [taskDescription, setTitle] = useState(task?.taskDescription || "");
   const [questionForTasks, setDescription] = useState(task?.questionForTasks || "");
   const { choices, correctAnswer, setCorrectAnswer, handleChoiceChange, addChoice, removeChoice } = useTaskChoices();
   const [multimediaStatus, setMultimediaStatus] = useState("hasNotMedia")

   const convertedChoicesForAPI = (choices) => {
      const convertedChoices = {}
      choices.forEach((item, index) => {
         const key = `answerVariation${index + 1}`
         convertedChoices[key] = item
      })
      return convertedChoices
   }

   const handleSubmitTask = () => {
      const updatedTask = {
         id: task?.id,
         taskDescription,
         questionForTasks,
         correctAnswer,
         ...convertedChoicesForAPI(choices),
         taskType: determineTaskType(multimediaStatus, answerType)
      };
      onUpdateTask(updatedTask.id, updatedTask);
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
      <div style={{ borderRadius: 15, background: "rgba(255,255,255,0.7)" }}>
         <div style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px" }}>
            <h2>Task {task.id}</h2>
            <TextField
               label="Title"
               type="text"
               style={{ borderRadius: 30 }}
               value={taskDescription}
               onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
               label="Description"
               multiline
               minRows={3}
               value={questionForTasks}
               onChange={(e) => setDescription(e.target.value)}
            />
            <MultimediaInput onUpload={(type) => setMultimediaStatus(type)} />
            <h3>Тип відповіді</h3>
            <AnswerTypeSelector answerType={answerType} onChange={setAnswerType} />
            {answerComponents[answerType]}
            <MyButton onClick={() => handleSubmitTask()} text={"Submit Task"}></MyButton>
         </div>
      </div>
   );
}
