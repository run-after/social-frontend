import '../styles/SignUp.css';
import { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

function SignUp(props) {

  let history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  };

  const [message, setMessage] = useState(null);

  const setTokenWithExpiration = (data) => {
    const item = {
      token: data.token,
      user: data.user._id,
      expires: moment().add(1, 'days')
    };
    localStorage.setItem('token', JSON.stringify(item));
    props.setLoggedIn(true);
  };

  const createUser = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': e.target.email.value,
        'password': e.target.password.value,
        'firstName': e.target.firstName.value,
        'lastName': e.target.lastName.value
      })
    }).then((res) => {
      res.json().then((res) => {
        if (res.user) {
          setTokenWithExpiration(res);
          setMessage(null);
          redirectToHome();
        } else {
          setMessage(res.message);
        };
      });
    });
  };

  return (
    <div className="signup">
      <form className='signup-form' onSubmit={createUser}>
        {message && message.map((msg) => {
          return <p key={msg}className='error-message'>{msg}</p>
        })}
        <h5>Sign up</h5>
        <input id='firstName' placeholder='First Name' />
        <input id='lastName' placeholder='Last Name' />
        <input id='email' type='email' placeholder='Email' required />
        <input id='password' type='password' placeholder='Password' required />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;