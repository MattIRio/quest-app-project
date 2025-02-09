import { useState } from "react";
import AddQuestInfo from "../components/CreateQuestSection.jsx/AddQuestInfo";
import AddQuestTask from "../components/CreateQuestSection.jsx/AddTaskkSection/AddQuestTask";
import GoBackButton from "../UI/button/GoBackButton";
import AddTaskButton from "../components/CreateQuestSection.jsx/AddTaskkSection/AddTaskBlock";

export default function CreateQuest() {
   const [tasks, setTasks] = useState([]); // Масив для зберігання тасок

   const handleAddTaskClick = () => {
      // Створюємо нову таску з унікальним ID
      console.log(1)
      const newTask = { id: tasks.length + 1, name: "", description: "" };
      setTasks([...tasks, newTask]); // Додаємо нову таску до масиву
   };

   const handleUpdateTask = (id, updatedTask) => {
      // Оновлюємо таску за її ID
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
            <AddQuestTask key={task.id} task={task} onUpdateTask={handleUpdateTask} />
         ))}
         <AddTaskButton onClick={() => handleAddTaskClick()} />
      </>
   );
}
