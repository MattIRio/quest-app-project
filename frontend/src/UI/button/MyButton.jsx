import classes from "./MyButton.module.css";

export const MyButton = ({ text, style, ...props }) => {
   return (
      <button className={classes.myButton} {...props} style={{ ...style }}>{text}</button>
   );
}

