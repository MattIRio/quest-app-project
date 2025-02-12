import React from 'react'
import { Link } from 'react-router-dom'
import ContainerBlurBg from '../container/ContainerBlurBg'
import classes from './Error.module.css';



export default function Error() {
   return (
      <div className={classes.error}>
         <Link to="/auth">
            <h2 >Спробуйте авторизуватись та повторити спробу або перевірте інтернет з'єднання </h2>
         </Link>
      </div>
   )
}
