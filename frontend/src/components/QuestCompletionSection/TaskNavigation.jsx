import { useState } from "react";

export function TaskNavigation({ tasks, currentTask, setCurrentTask, answers }) {
   const [hoveredTask, setHoveredTask] = useState(null);

   return (
      <div className="task-map">
         {tasks.map((task, index) => (
            <div
               key={index}
               className="task-container"
               onMouseEnter={() => setHoveredTask(index)}
               onMouseLeave={() => setHoveredTask(null)}
            >
               <button
                  className={`task-btn ${answers[index] ? "completed" : index === currentTask ? "active" : ""}`}
                  onClick={() => setCurrentTask(index)}
               >
                  {index + 1}
               </button>
               {hoveredTask === index && (
                  <div className="tooltip tooltip-animate">{task.question}</div>
               )}
            </div>
         ))}
      </div>
   );
}