import '../styles/Header.css';
import icon from '../media/s-icon.png';
import { Link } from 'react-router-dom';
import { BsHouseDoorFill, BsFillPersonFill, BsFillPeopleFill } from 'react-icons/bs';

function Header(props) {
  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <header className="header">
      <div className='logo'>
        <img className='icon' src={icon} alt='social'/>
        <p className='logo-text'>social</p>
      </div>
      <nav className='nav-bar'>
        <ul className='nav-bar-list'>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to='/'><BsHouseDoorFill /></Link>}
          </li>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to={`/users/${token.user._id}`}><BsFillPersonFill /></Link>}
          </li>
          <li className='nav-bar-list-item'>
            {props.loggedIn && <Link to='/users'><BsFillPeopleFill /></Link>}
          </li>
        </ul>
      </nav>
      <div className='action-buttons'>
        {props.loggedIn && <button className='action-button btn' onClick={props.logOut}>Log out</button>}
        {!props.loggedIn && <Link className='action-button btn' to='/signup'>Sign up</Link>}
        {!props.loggedIn && <Link className='action-button btn' to='login'>Log in</Link>}
      </div>
    </header>
  );
}

export default Header;
