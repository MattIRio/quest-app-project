import React, { useState, useEffect } from 'react';
import { questData } from '../constants/temporary/quests';
import '../styles/QuestCompletion.css';
import ContainerBlurBg from '../UI/container/ContainerBlurBg';
import { TaskNavigation } from '../components/QuestCompletionSection/TaskNavigation';
import { TaskView } from '../components/QuestCompletionSection/TaskView';
import { TaskResults } from '../components/QuestCompletionSection/TaskResult';
import { Timer } from '../components/QuestCompletionSection/Timer';


export default function QuestCompletion() {
   const [currentTask, setCurrentTask] = useState(0);
   const [answers, setAnswers] = useState({});
   const [completed, setCompleted] = useState(false);
   const [results, setResults] = useState([]);
   const [timeLeft, setTimeLeft] = useState(300);
   const [isTimerRunning, setIsTimerRunning] = useState(true);

   useEffect(() => {
      if (isTimerRunning && timeLeft > 0) {
         const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
         }, 1000);

         return () => clearInterval(timerId);
      } else if (timeLeft === 0) {
         finishQuest();
      }
   }, [isTimerRunning, timeLeft]);

   const handleAnswer = (option) => {
      setAnswers(prev => ({ ...prev, [currentTask]: option }));
   };

   const handleTextAnswer = (event) => {
      setAnswers(prev => ({ ...prev, [currentTask]: event.target.value }));
   };

   const finishQuest = () => {
      const questionResults = questData.tasks.map((task, index) => {
         const answer = answers[index]?.trim().toLowerCase();
         return {
            question: task.question,
            correct: task.correct,
            answer,
            isCorrect: (answer === task.correct.toLowerCase())
         };
      });

      setResults(questionResults);
      setCompleted(true);
      setIsTimerRunning(false);
   };

   return (
      <ContainerBlurBg>
         <h1>{questData.title}</h1>
         <p>{questData.description}</p>
         <Timer timeLeft={timeLeft} />
         <TaskNavigation tasks={questData.tasks} currentTask={currentTask} setCurrentTask={setCurrentTask} answers={answers} />
         {
            completed
               ? <TaskResults results={results} totalTasks={questData.tasks.length} />
               : <><TaskView task={questData.tasks[currentTask]} currentTask={currentTask} answers={answers} handleAnswer={handleAnswer} handleTextAnswer={handleTextAnswer} />
                  {Object.keys(answers).length === questData.tasks.length && (
                     <button className="finish-btn" onClick={finishQuest}>Завершити квест</button>
                  )}</>
         }
      </ContainerBlurBg>
   );
}
