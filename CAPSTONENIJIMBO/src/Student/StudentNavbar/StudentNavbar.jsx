import React, {useState, useContext} from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './logo.png';
import './studentNavbar.css';
const StudentNavbar = () => {
    const[menuOpen, setMenuOpen] = useState(false)
    const location = useLocation(); // Get current location

  const studentID = location.pathname.split('/')[3]; // Ex
  return (
    <nav className='Snav'>
        <Link to={`/Student/Homepage/${studentID}`} className='nav__logo'>
              <img src={Logo} alt='Navbar Logo'/>
            </Link>
            <div className='menu' onClick={() => {
                setMenuOpen(!menuOpen)
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div >
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to={`/Student/Events/${studentID}`}>Events</NavLink>
            </li>
            <li>
                <NavLink to={`/Student/Articles/${studentID}`}>Articles</NavLink>
            </li>
            <li>
                <NavLink to={`/Student/FaQs/${studentID}`}>About Us</NavLink>
            </li>
            <li>
                <NavLink to={`/Student/Profile/${studentID}`}>{studentID}</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default StudentNavbar