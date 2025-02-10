export function TaskView({ task, currentTask, answers, handleAnswer, handleTextAnswer }) {
   return (
      <>
         <h2>{currentTask + 1}. {task.title}</h2>
         <p>{task.question}</p>
         {task.type === "multiple-choice" ? (
            <div className="options">
               {task.options.map((option, i) => (
                  <button
                     key={i}
                     className={`option-btn ${answers[currentTask] === option ? "selected" : ""}`}
                     onClick={() => handleAnswer(option)}
                  >
                     {option}
                  </button>
               ))}
            </div>
         ) : (
            <input
               type="text"
               className="text-input"
               placeholder="Введіть відповідь"
               value={answers[currentTask] || ""}
               onChange={handleTextAnswer}
            />
         )}
      </>
   );
}