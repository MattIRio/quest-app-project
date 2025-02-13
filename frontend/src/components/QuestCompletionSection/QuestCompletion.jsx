import React, { useEffect, useState } from 'react'
import { questService } from '../../services/questService';
import ContainerBlurBg from '../../UI/container/ContainerBlurBg';
import { Timer } from './Timer';
import { TaskNavigation } from './TaskNavigation';
import { TaskResults } from './TaskResult';
import { TaskView } from './TaskView';
import '../../styles/QuestCompletion.css';
import { MyButton } from '../../UI/button/MyButton';
import { Link } from 'react-router-dom';

export default function QuestCompletion({ questData, setIsGoing }) {
   const [currentTask, setCurrentTask] = useState(0);
   const [answers, setAnswers] = useState({});
   const [completed, setCompleted] = useState(false);
   const [results, setResults] = useState([]);
   const [timeLeft, setTimeLeft] = useState(null);
   const [isTimerRunning, setIsTimerRunning] = useState(false);
   const [comleteTask, { isLoading }] = questService.useCompleteTaskMutation()

   useEffect(() => {
      if (questData) {
         const now = Date.now();
         const elapsedTime = (now - questData.startedAt) / 1000; // Переведення мілісекунд у секунди
         const remainingTime = Math.floor(Math.max(questData.timeLimit - elapsedTime, 0));
         console.log(remainingTime)
         setTimeLeft(remainingTime);
         setIsTimerRunning(remainingTime > 0);
      }
   }, [questData]);

   useEffect(() => {
      if (isTimerRunning && timeLeft > 0) {
         const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
               if (prevTime <= 1) {
                  clearInterval(timerId);
                  finishQuest();
                  return 0;
               }
               return prevTime - 1;
            });
         }, 1000);
         return () => clearInterval(timerId);
      }
   }, [isTimerRunning, timeLeft]);


   const sendCompletedTask = async (answer) => {
      try {
         const result = !!(answer === questData.ongoingTasks[currentTask].relatedTask.expectedAnswer.toLowerCase())
         const taskId = questData.ongoingTasks[currentTask].id
         const reseivedAnswer = answer
         console.log(1)
         const res = await comleteTask({ result, taskId, reseivedAnswer })
         console.log(res)
      } catch (error) {
         console.log(error)
      }
   }

   const handleAnswer = (option) => {
      sendCompletedTask(option)
      setAnswers(prev => ({ ...prev, [currentTask]: option }));
   };

   const handleTextAnswer = (event) => {
      sendCompletedTask(event.target.value)
      setAnswers(prev => ({ ...prev, [currentTask]: event.target.value }));
   };

   const finishQuest = () => {
      if (!questData) return;

      const questionResults = questData.ongoingTasks.map((task, index) => {
         const answer = answers[index]?.trim().toLowerCase();
         return {
            question: task.relatedTask.question,
            expectedAnswer: task.relatedTask.expectedAnswer,
            answer,
            isCorrect: (answer === task.relatedTask.expectedAnswer.toLowerCase())
         };
      });
      setIsGoing(false)
      setResults(questionResults);
      setCompleted(true);
      setIsTimerRunning(false);
   };


   const isQuestCompletedYet = !questData.ongoingTasks[currentTask]
   return (
      <ContainerBlurBg>{
         isQuestCompletedYet
            ? <Link to={"/main"}><MyButton text={"Ви вже проходили цей квест, пропоную пройти шось нове"}> </MyButton></Link>
            : (
               <>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <div>
                        <h1>{questData.name}</h1>
                        <p>{questData.description}</p>
                        <Timer timeLeft={timeLeft} />
                     </div>
                     <TaskNavigation tasks={questData.ongoingTasks} currentTask={currentTask} setCurrentTask={setCurrentTask} answers={answers} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                     {
                        completed
                           ? <TaskResults results={results} totalTasks={questData.ongoingTasks.length} />
                           : <>
                              <TaskView task={questData.ongoingTasks[currentTask].relatedTask || questData.performed[currentTask].relatedTask} currentTask={currentTask} answers={answers} handleAnswer={handleAnswer} handleTextAnswer={handleTextAnswer} />
                              {Object.keys(answers).length === questData.ongoingTasks.length && (
                                 <button className="finish-btn" onClick={finishQuest}>Завершити квест</button>
                              )}
                           </>
                     }
                  </div>

               </>
            )
      }


      </ContainerBlurBg >
   );
}
