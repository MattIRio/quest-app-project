
import classes from './Container.module.css';



const Container = ({ children }) => {
   return (
      <div className={classes.wrapper}>
         <div className={classes.container}>{children}</div>
      </div>
   )

};

export default Container;
