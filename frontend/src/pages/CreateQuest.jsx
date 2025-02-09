import { useState } from "react";
import AddQuestInfo from "../components/CreateQuestSection.jsx/AddQuestInfo";
import CreateTaskForm from "../components/CreateQuestSection.jsx/AddTaskkSection/CreateTaskForm";
import GoBackButton from "../UI/button/GoBackButton";
import { MyButton } from "../UI/button/MyButton";

export default function CreateQuest() {
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
   console.log(tasks)

   return (
      <>
         <GoBackButton />
         <AddQuestInfo />
         {tasks.map((task) => (
            <CreateTaskForm key={task.id} task={task} onUpdateTask={handleUpdateTask} />
         ))}
         <MyButton text={"+AddTask"} onClick={() => handleAddTaskClick()} />
      </>
   );
}
