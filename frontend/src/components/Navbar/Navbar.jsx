
import { Link } from 'react-router-dom';
import "./Navbar.css"



const Navbar = () => {

   return (
      <div className='navbar'>
         <Link to={'/lesson'}>Логін</Link>
      </div>
   )
}

export default Navbar;