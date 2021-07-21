import '../styles/Users.css';
import { useState, useEffect } from 'react';

function Users() {

  const token = JSON.parse(localStorage.getItem('token'));

  const [users, setUsers] = useState(null);
  const [friendRequested, setFriendRequested] = useState({ data: [] });
  const [requestedFriends, setRequestedFriends] = useState({ data: [] });
  
  const requestFriend = (person) => {
    // Make call to api to create new friend request
    fetch(`${process.env.REACT_APP_API_DOMAIN}/friendRequests/${person._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then(() => {
        // Update state to show that friend was requested
        let tempRequested = requestedFriends.data;
        tempRequested.push(person._id);
        setRequestedFriends({ data: tempRequested });
      });
    });
  };

  useEffect(() => {
    // Make api call to get all users
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      }
    ).then((initRes) => {
      initRes.json().then((res) => {
        setUsers(res);
      });
    });
    // Get all friend requests that apply to current user
    fetch(`${process.env.REACT_APP_API_DOMAIN}/friendRequests`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then((res) => {
        let friendRequestedList = [];
        let requestedFriendList = [];
        res.forEach((request) => {
          if (request.requester === token.user._id) {
            requestedFriendList.push(request.requested);
          } else if (request.requested === token.user._id) {
            friendRequestedList.push(request.requester);
          };
        });
        setRequestedFriends({ data: requestedFriendList });
        setFriendRequested({ data: friendRequestedList });
      });
    });
  }, [token.user, token.token]);

  return (
    <div className='users-page'>
      <div className='left-column'>
        Whatever
      </div>
      {users && users.map((user) => {
        if (user._id !== token.user._id) {
          return (
            <div key={user._id} className='user'>
              <div className='user-image'>placeholder</div>
              <h5 className='user-name'>{`${user.firstName} ${user.lastName}`}</h5>
              {
                ((requestedFriends.data.includes(user._id) &&
                  <div className='requested-block'>Friend requested</div>) ||
                (friendRequested.data.includes(user._id) &&
                  <button className='friend-requested btn'>Accept request</button>)) ||
                <button className='add-friend-button btn' onClick={() => requestFriend(user)}>Add friend</button> 
              }
            </div>
          );
        }
      })}
    </div>
  );
}

export default Users;