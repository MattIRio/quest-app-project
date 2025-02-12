import { useState } from "react";
import AddQuestInfo from "../components/CreateQuestSection.jsx/AddQuestInfo";
import CreateTaskForm from "../components/CreateQuestSection.jsx/AddTaskkSection/CreateTaskForm";
import GoBackButton from "../UI/button/GoBackButton";
import { MyButton } from "../UI/button/MyButton";
import { questService } from "../services/questService";

export default function CreateQuest() {
   const [questData, setQuestData] = useState({
      name: "",
      description: "",
      timeLimit: 300
   });

   const [tasks, setTasks] = useState([]); // Масив для зберігання тасок

   const handleAddTaskClick = () => {
      const newTask = { id: tasks.length + 1 };
      setTasks([...tasks, newTask]);
   };

   const handleUpdateTask = (id, updatedTask) => {
      const updatedTasks = tasks.map((task) =>
         task.id === id ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
   };


   const [initQuestId, { isLoading: isInitQuestLoading }] = questService.useInitQuestIdMutation();
   const [addTaskToQuest, { isLoading }] = questService.useAddTaskToQuestMutation();


   const handleSubmitQuest = async () => {
      try {
         const { data: questID } = await initQuestId({ ...questData, amountOfQuestions: tasks.length }); // викликаємо запит
         console.log(questID);
         await Promise.all([...tasks.map(item => {
            console.log(item)
            let { id, ...body } = item
            return addTaskToQuest({ questID, body }).unwrap()
         })])
         console.log("TASK CREATED")
      } catch (err) {
         console.error('Failed to sign in:', err);
      }
   };

   return (
      <>
         <GoBackButton />
         <AddQuestInfo questData={questData} setQuestData={setQuestData} />
         {tasks.map((task) => (
            <CreateTaskForm key={task.id} task={task} onUpdateTask={handleUpdateTask} />
         ))}
         <MyButton text={"+AddTask"} onClick={() => handleAddTaskClick()} />
         <MyButton text={"Submit quest"} onClick={() => handleSubmitQuest()} />
      </>
   );
}
