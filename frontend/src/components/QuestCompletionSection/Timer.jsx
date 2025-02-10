export function Timer({ timeLeft }) {
   return <p>Час залишився: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>;
}
