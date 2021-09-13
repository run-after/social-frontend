import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Home from './components/Home';
import Weather from './components/Weather';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    window.location.reload();
  };

  const checkIfTokenIsExpired = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (moment(token.expires) < moment()) {
      logOut();
      return true;
    } else {
      return false;
    };
  };

  useEffect(() => {
    // Check if token is expired.
    if (localStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token'));
      // If token is expired, remove and set loggedIn status to false.
      if (moment(token.expires) < moment()) {
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
  }, []);

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} logOut={logOut} />
        <Switch>
          <Route path='/login'>
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/signup'>
            <SignUp setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/users/:userID'>
            {(!loggedIn && <Redirect to='/login' />) || <Profile checkIfTokenIsExpired={checkIfTokenIsExpired} logOut={logOut} />}
          </Route>
          <Route path='/users'>
            {(!loggedIn && <Redirect to='/login' />) || <Users checkIfTokenIsExpired={checkIfTokenIsExpired} />}
          </Route>
          <Route path='/friends'>
            {(!loggedIn && <Redirect to='/login' />) || <Friends checkIfTokenIsExpired={checkIfTokenIsExpired} />}
          </Route>
          <Route path='/weather'>
            {(!loggedIn && <Redirect to='/login' />) || <Weather checkIfTokenIsExpired={checkIfTokenIsExpired} />}
          </Route>
          <Route path='/'>
            {(!loggedIn && <Redirect to='/login' />) || <Home checkIfTokenIsExpired={checkIfTokenIsExpired} />}
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// I think I'll add a weather widget on the sidebar of home screen like
// real facebook