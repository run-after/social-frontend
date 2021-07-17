import '../styles/Login.css';
import { useState } from 'react';
import moment from 'moment';

function Login(props) {

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

  const login = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_DOMAIN}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': e.target.username.value,
        'password': e.target.password.value
      })
    }).then((res) => {
      res.json().then((res) => {
        if (res.user) {
          setTokenWithExpiration(res);
          setMessage(null);
        } else {
          setMessage(res.message);
        };
      });
    });
  };

  return (
    <div className="login">
      <form className='login-form' onSubmit={login}>
        <p className='error-message'>{message}</p>
        <h5>Log in</h5>
        <input id='username' type='email' placeholder='email' required />
        <input id='password' type='password' placeholder='password' required />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default Login;