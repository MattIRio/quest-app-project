import classes from "./MyButton.module.css";



export const MyButton = ({ text, ...props }) => {
   return (
      <button className={classes.myButton} {...props}>{text}</button>
   );
}

