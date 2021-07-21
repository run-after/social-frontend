import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
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
          <Route path='/users'>
            {(!loggedIn && <Redirect to='/login' />) || <Users />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// Need to add a way to add/remove friends on the backend