import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Profile from './components/Profile';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
  }, [])

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
            {(!loggedIn && <Redirect to='/login' />) || <Profile />}
          </Route>
          <Route path='/users'>
            {(!loggedIn && <Redirect to='/login' />) || <Users />}
          </Route>
          <Route path='/'>
            {(!loggedIn && <Redirect to='/login' />) || <Home />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// Need to add a way to remove friends on the backend

// When token expires, the app doesn't check the token all the time.
// It only checks when app is first loaded

// Need to make edit button work on post
// Need comments to show up on each post
// Avatar on each post
// Need to have a comment form
// Need a default avatar
// Need a way to make avatar picture work
// Need to login via real facebook
// Add likes to post/comments