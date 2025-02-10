
export function TaskResults({ results, totalTasks }) {
   return (
      <div >
         Ви відповіли правильно на {results.filter(result => result.isCorrect).length} із {totalTasks} питань.
         <ul className="result">
            {results.map((result, index) => (
               <li key={index}>
                  {index + 1}. {result.question} {result.answer ? (<>
                     <br />
                     Ваша відповідь: {result.answer}, Правильна відповідь: {result.correct}, {result.isCorrect ? 'Правильно' : 'Неправильно'}
                  </>) : 'Питання відсутнє'}
               </li>
            ))}
         </ul>
      </div>
   );
}
