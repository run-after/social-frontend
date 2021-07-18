import '../styles/Header.css';
import icon from '../media/s-icon.png';
import { Link } from 'react-router-dom';
import { BsHouseDoorFill, BsFillPersonFill, BsFillPeopleFill } from 'react-icons/bs';

function Header(props) {
  return (
    <header className="header">
      <div className='logo'>
        <img className='icon' src={icon} alt='social'/>
        <p>social</p>
      </div>
      <nav className='nav-bar'>
        <ul className='nav-bar-list'>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to='/'><BsHouseDoorFill /></Link>}
          </li>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to='/profile'><BsFillPersonFill /></Link>}
          </li>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to='/users'><BsFillPeopleFill /></Link>}
          </li>
        </ul>
      </nav>
      <div className='action-buttons'>
        {props.loggedIn && <button className='action-button' onClick={props.logOut}>log-out</button>}
        {!props.loggedIn && <Link className='action-button' to='/signup'>Sign up</Link>}
        {!props.loggedIn && <Link className='action-button' to='login'>Log in</Link>}
      </div>
    </header>
  );
}

export default Header;
