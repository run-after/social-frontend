import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import moment from 'moment';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  useEffect(() => {
    // Check if token is expired.
    if (localStorage.getItem('token')) {
      const tokenExpiration = JSON.parse(localStorage.getItem('token')).expires;
      // If token is expired, remove and set loggedIn status to false.
      if (moment(tokenExpiration) < moment()) {
        localStorage.removeItem('token');
        setLoggedIn(false);
      } else {
        // If token is not expired, set loggedIn status to true.
        setLoggedIn(true);
      };
      // If no token, set loggedIn status to false.
    } else {
      setLoggedIn(false);
    };
  }, [])

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} logOut={logOut} />
      {!loggedIn && <Login setLoggedIn={setLoggedIn} />}
    </div>
  );

};

export default App;