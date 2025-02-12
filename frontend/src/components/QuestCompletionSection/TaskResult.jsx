
export function TaskResults({ results, totalTasks }) {
   console.log(results)
   return (
      <div >
         Ви відповіли правильно на {results.filter(result => result.isCorrect).length} із {totalTasks} питань.
         <ul className="result">
            {results.map((result, index) => (
               <li key={index}>
                  {index + 1}. {result.question} {result.expectedAnswer ? (<>
                     Ваша відповідь: {result.answer}, Правильна відповідь: {result.expectedAnswer}, Ви відповіли {result.isCorrect ? 'правильно' : 'неправильно'}
                  </>) : 'Питання відсутнє'}
               </li>
            ))}
         </ul>
      </div>
   );
}
