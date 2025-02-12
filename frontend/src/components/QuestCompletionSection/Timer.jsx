function secondsToHMS(seconds) {
   if (isNaN(seconds) || seconds < 0) return "00:00:00";

   let hours = Math.floor(seconds / 3600);
   let minutes = Math.floor((seconds % 3600) / 60);
   let secs = seconds % 60;

   return [hours, minutes, secs]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
}
export function Timer({ timeLeft }) {

   return <p>Час залишився: {secondsToHMS(timeLeft)}</p>;
}