import '../styles/Users.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Users(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [users, setUsers] = useState(null);
  const [friendRequested, setFriendRequested] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);
  const [friendList, setFriendList] = useState(token.user.friends);
  
  const requestFriend = (person) => {
    if (!props.checkIfTokenIsExpired()) {
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
          let tempRequested = [...requestedFriends];
          tempRequested.push(person._id);
          setRequestedFriends(tempRequested);
        });
      }); 
    };
  };

  const removeFriend = (person) => {
    if (!props.checkIfTokenIsExpired()) {
      const currentUser = JSON.parse(localStorage.getItem('token')).user;

      // Remove current user from person who requested friendship's friend list
      let filteredFriends = person.friends.filter(friend => {
        return friend !== currentUser._id;
      });

      person.friends = filteredFriends;
      fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${person._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify(person)
      });

      // Remove person who requested friendship from current user's friend list
      filteredFriends = currentUser.friends.filter(friend => {
        return friend !== person._id;
      });
      currentUser.friends = filteredFriends;
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
          setFriendList(filteredFriends);
        });
      });
    };
  };

  const acceptRequest = (person) => {
    if (!props.checkIfTokenIsExpired()) {

      // Remove person from friendRequested state
      setFriendRequested(friendRequested.filter(friend => friend !== person._id));

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
      setFriendList(currentUser.friends);
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
  };

  useEffect(() => {
    if (!props.checkIfTokenIsExpired()) {
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
            setRequestedFriends(requestedFriendList);
            setFriendRequested(friendRequestedList);  
          };
          
        });
      });
      return () => {
        componentMounted = false;
      };
    };
  }, [token.user._id, token.token]);

  return (
    <div className='users-page'>
      {
        users && users.map((user) => {
        if (user._id !== token.user._id) {
          return (
            <div key={user._id} className='user'>
              <Link className='user-image-backdrop' to={`/users/${user._id}`}>
                <img className='user-image' src={user.avatar} alt={`${user.firstName}'s avatar`} />
              </Link>
              <h5 className='user-name'><Link to={`/users/${user._id}`}>{`${user.firstName} ${user.lastName}`}</Link></h5>
              {
                (friendList.includes(user._id) && <button className='remove-friend-button btn' onClick={() => removeFriend(user)}>Remove friend</button>) || 
                (((requestedFriends.includes(user._id) &&
                  <div className='requested-block'>Friend requested</div>) ||
                (friendRequested.includes(user._id) &&
                  <button className='friend-requested btn' onClick={() => acceptRequest(user)}>Accept request</button>)) ||
                <button className='add-friend-button btn' onClick={() => requestFriend(user)}>Add friend</button> )
              }
            </div>
          );
        };
        })
      }
    </div>
  );
};

export default Users;