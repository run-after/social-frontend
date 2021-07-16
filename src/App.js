import './styles/App.css';
import Login from './components/Login';
import { useEffect } from 'react';
import moment from 'moment';

function App() {

  useEffect(() => {
    // Check if token is expired. If so, remove token
    if (localStorage.getItem('token')) {
      const tokenExpiration = JSON.parse(localStorage.getItem('token')).expires;
      if (moment(tokenExpiration) < moment()) {
        localStorage.removeItem('token');
      };
    };

  }, [])

  return (
    <div className="App">
      <Login />
    </div>
  );

};

export default App;