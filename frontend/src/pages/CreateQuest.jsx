import { useState } from "react";
import AddQuestInfo from "../components/CreateQuestSection.jsx/AddQuestInfo";
import CreateTaskForm from "../components/CreateQuestSection.jsx/AddTaskkSection/CreateTaskForm";
import GoBackButton from "../UI/button/GoBackButton";
import { MyButton } from "../UI/button/MyButton";
import { questService } from "../services/questService";
import { legacy_createStore } from "@reduxjs/toolkit";

export default function CreateQuest() {
   const [questData, setQuestData] = useState({
      name: "",
      description: "",
      timeLimit: 30000
   });

   const [tasks, setTasks] = useState([]); // Масив для зберігання тасок

   const handleAddTaskClick = () => {
      const newTask = { id: tasks.length + 1 };
      setTasks([...tasks, newTask]);
   };

   const handleUpdateTask = (id, updatedTask) => {
      setTasks((prevTasks) =>
         prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
      );
   };

   console.log(tasks)
   const [initQuestId, { isLoading: isInitQuestLoading }] = questService.useInitQuestIdMutation();
   const [addTaskToQuest, { isLoading }] = questService.useAddTaskToQuestMutation();


   const handleSubmitQuest = async () => {
      try {
         const { data: questID } = await initQuestId({
            ...questData,
            amountOfQuestions: tasks.length,
         });

         console.log(questID);

         await Promise.all(
            tasks.map(async (item) => {
               const formData = new FormData();
               const { id, photo, ...body } = item;

               // Змінено спосіб додавання JSON
               formData.append("questTaskModel", JSON.stringify(body)); // Додаємо як текст, як у Postman

               if (photo) {
                  console.log(photo)
                  formData.append("photo", photo);
               }
               for (let pair of formData.entries()) {
                  console.log(pair[0], pair[1]);
               }

               return await addTaskToQuest({ questID, formData }).unwrap();
            })
         );

         console.log("TASK CREATED");
      } catch (err) {
         console.error("Failed to create task:", err);
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
