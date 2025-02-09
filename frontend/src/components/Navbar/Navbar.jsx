
import { Link } from 'react-router-dom';
import "./Navbar.css"



const Navbar = () => {

   return (
      <div className='navbar'>
         <Link to={'/profile'}>Профіль</Link>
         <Link to={'/main'}>Квести</Link>
      </div>
   )
}

export default Navbar;