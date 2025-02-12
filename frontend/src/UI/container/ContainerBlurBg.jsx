import classes from './ContainerBlurBg.module.css';



const ContainerBlurBg = ({ children }) => {
   return (
      <div className={classes.containerBlurBg}>{children}</div>
   )
};

export default ContainerBlurBg;
