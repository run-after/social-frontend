import '../styles/Friends.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Friends(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [friends, setFriends] = useState(null);

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
          setFriends(filteredFriends);
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
            const filteredFriends = res.filter(user => token.user.friends.includes(user._id))
            setFriends(filteredFriends);  
          };
        });
      });
      return () => {
        componentMounted = false;
      };
    };
  }, [token.user._id, token.token]);

  return (
    <div className='friends-page'>
      {
        friends && friends.map((user) => {
        if (user._id !== token.user._id) {
          return (
            <div key={user._id} className='user'>
              <Link className='user-image-backdrop' to={`/users/${user._id}`}>
                <img className='user-image' src={user.avatar} alt={`${user.firstName}'s avatar`} />
              </Link>
              <h5 className='user-name'><Link to={`/users/${user._id}`}>{`${user.firstName} ${user.lastName}`}</Link></h5>
              <button className='remove-friend-button btn' onClick={() => removeFriend(user)}>Remove friend</button>
              
            </div>
          );
        };
        })
      }
    </div>
  );
};

export default Friends;