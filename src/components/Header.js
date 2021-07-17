import '../styles/Header.css';
import icon from '../media/s-icon.png';

function Header(props) {

  return (
    <header className="header">
      <img className='icon' src={icon} alt='social'/>
      <p>Social</p>
      {props.loggedIn && <button>feed</button>}
      {props.loggedIn && <button>profile</button>}
      {props.loggedIn && <button>users</button>}
      {!props.loggedIn && <button>Sign up</button>}
      {!props.loggedIn && <button>log in</button>}
      {props.loggedIn && <button onClick={props.logOut}>log-out</button>}
    </header>
  );
}

export default Header;
