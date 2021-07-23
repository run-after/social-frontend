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

  const acceptRequest = (person) => {
    const currentUser = JSON.parse(localStorage.getItem('token')).user;

    // Add current user to person who requested friendship's friend list
    person.friends.push(currentUser._id);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${person._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify(person)
    });

    // Add person who requested friendship to current user's friend list
    currentUser.friends.push(person._id);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify(currentUser)
    }).then((res) => {
      res.json().then((res) => {
        let updatedToken = JSON.parse(localStorage.getItem('token'));
        updatedToken.user = res;
        localStorage.setItem('token', JSON.stringify(updatedToken));
      });
    });

    // Find friend request in database
    fetch(`${process.env.REACT_APP_API_DOMAIN}/friendRequests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
    }).then((initRes) => {
      initRes.json().then((res) => {
        res.forEach((request) => {
          if (request.requested === currentUser._id && request.requester === person._id) {
            // Remove friend request from DB
            fetch(`${process.env.REACT_APP_API_DOMAIN}/friendRequests/${request._id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
              }
            });
          };
        });
      });
    });
  };

  useEffect(() => {
    let componentMounted = true;
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
        if (componentMounted) {
          setUsers(res);  
        };
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
        if (componentMounted) {
          setRequestedFriends({ data: requestedFriendList });
          setFriendRequested({ data: friendRequestedList });  
        };
        
      });
    });
    return () => {
      componentMounted = false;
    };
  }, [token]);

  return (
    <div className='users-page'>
      <aside className='left-column'>
        Whatever
      </aside>
      {users && users.map((user) => {
        if (user._id !== token.user._id) {
          return (
            <div key={user._id} className='user'>
              <div className='user-image'>placeholder</div>
              <h5 className='user-name'>{`${user.firstName} ${user.lastName}`}</h5>
              {// so confusing... but it works
                (token.user.friends.includes(user._id) && <p>friends</p>) || 
                (((requestedFriends.data.includes(user._id) &&
                  <div className='requested-block'>Friend requested</div>) ||
                (friendRequested.data.includes(user._id) &&
                  <button className='friend-requested btn' onClick={() => acceptRequest(user)}>Accept request</button>)) ||
                <button className='add-friend-button btn' onClick={() => requestFriend(user)}>Add friend</button> )
              }
            </div>
          );
        }
      })}
    </div>
  );
};

export default Users;