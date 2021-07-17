import '../styles/Users.css';
import { useState, useEffect } from 'react';

function Users() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    fetch(`${process.env.REACT_APP_API_DOMAIN}/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res) => {
      res.json().then((res) => {
        setUsers(res);
      });
    });
  }, []);


  return (
    <div className='users-page'>
      {users && users.map((user) => {
        return (
          <div key={user._id} className='user'>
            {user.firstName}
          </div>
        );
      })}
    </div>
  );
}

export default Users;
