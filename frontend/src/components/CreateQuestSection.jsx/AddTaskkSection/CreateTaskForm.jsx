import { TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { ChoiceAnswer } from "./ChoiceAnswer";
import { AnswerTypeSelector } from "./AnswerTypeSelector";
import { useTaskChoices } from "../../../hooks/AddTasksForm/useTaskChoises";
import { MultimediaInput } from "./MultimediaInput";
import { TrueFalseAnswer } from "./TrueFalseAnswer";
import { FreeAnswer } from "./FreeAnswer";
import { MyButton } from "../../../UI/button/MyButton";
import { Modal } from "@mui/material";
import { ImageSelectionAnswer } from "./ImageSelectionAnswer";




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
   const [questionForTask, setDescription] = useState(task?.questionForTask || "");
   const { choices, correctAnswer, setCorrectAnswer, handleChoiceChange, addChoice, removeChoice } = useTaskChoices();
   const [multimediaStatus, setMultimediaStatus] = useState("hasNotMedia")
   const [multimediaUrl, setMultimediaUrl] = useState("")
   const [multimediaFile, setMultimediaFile] = useState(null)
   const convertedChoicesForAPI = (choices) => {
      const convertedChoices = {}
      choices.forEach((item, index) => {
         const key = `answerVariation${index + 1}`
         convertedChoices[key] = item
      })
      return convertedChoices
   }

   const handleSubmitTask = () => {
      const formData = new FormData();
      formData.append("task", JSON.stringify({
         id: task.id,
         taskDescription,
         questionForTask,
         placeInQuestQueue: task.id,
         expectedAnswer: correctAnswer,
         ...convertedChoicesForAPI(choices),
         taskType: determineTaskType(multimediaStatus, answerType)
      }));

      if (multimediaFile) {
         formData.append("PhotoForTask", multimediaFile);
      }

      console.log("Sending FormData:", formData);

      onUpdateTask(task.id, formData);
   };

   const answerComponents = useMemo(() => (
      {
         choice: (<ChoiceAnswer choices={choices} correctAnswer={correctAnswer} onChoiceChange={handleChoiceChange} onAddChoice={addChoice} onRemoveChoice={removeChoice} onSelectCorrect={setCorrectAnswer} />),
         imageSelection: (<ImageSelectionAnswer correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} imageUrl={multimediaStatus === "hasImage" ? multimediaUrl : ""} />),
         trueFalse: (<TrueFalseAnswer correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} />),
         freeAnswer: (<FreeAnswer correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} />)
      }
   ), [choices, correctAnswer, addChoice, answerType]);

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
               value={questionForTask}
               onChange={(e) => setDescription(e.target.value)}
            />
            <MultimediaInput onUpload={(url, type, file) => {
               setMultimediaUrl(url)
               setMultimediaStatus(type)
               setMultimediaFile(file)
            }} />
            <h3>Тип відповіді</h3>
            <AnswerTypeSelector answerType={answerType} onChange={setAnswerType} />
            {answerComponents[answerType]}
            <MyButton onClick={() => handleSubmitTask()} text={"Submit Task"}></MyButton>
         </div>
      </div>
   );
}
