
import classes from "./MyInput.module.css"

const MyInput = ({ labelText, ...inputProps }) => {
   return (

      <>
         {labelText && <label>{labelText ? labelText : ""}</label>}
         <input className={classes.myInput} {...inputProps} />
      </>

   );
}

export default MyInput;
