import { Link } from 'react-router-dom';


const Main = () => {

   return (
      <div >
         <Link to={"/lesson"}>Продовжити навчання</Link>
         <br />
         <Link to={"/auth"}>Увійти</Link>
      </div>
   )
}

export default Main;