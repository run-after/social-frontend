import '../styles/Login.css';
import { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function Login(props) {

  let history = useHistory();
  
  const redirectToHome = () => {
    history.push('/');
  };

  const [message, setMessage] = useState(null);

  const setTokenWithExpiration = (data) => {
    const item = {
      token: data.token,
      user: data.user,
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
          redirectToHome();
        } else {
          setMessage(res.message);
        };
      });
    });
  };

  const facebookLogin = (response) => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/login/facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }).then((initRes) => {
      initRes.json().then(res => {
        setTokenWithExpiration(res);
        redirectToHome();
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
        <button className='btn' type='submit'>Log in</button>
      </form>
      <div className='spacer'>OR</div>
      <FacebookLogin
        appId="343361590828520"
        callback={facebookLogin}
        isMobile={false}
        render={
          renderProps => (
          <button className='facebook-btn btn' onClick={renderProps.onClick}>Log in with Facebook</button>
          )
        }
      />
    </div>
  );
}

export default Login;