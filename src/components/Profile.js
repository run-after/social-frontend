import '../styles/Profile.css';
import Post from './Post';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';

function Profile() {

  const token = JSON.parse(localStorage.getItem('token'));
  const { userID } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState({ data: [] });
  const [textAreaText, setTextAreaText] = useState('');
  const [friends, setFriends] = useState(null);

  const createPost = (e) => {
    e.preventDefault();
    // API CALL TO CREATE POST
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify({ 'content': e.target.content.value, 'author': userID })
    }).then((initRes) => {
      initRes.json().then((res) => {
        let tempUserPosts = userPosts.data;
        res.author = user
        tempUserPosts.unshift(res);
        setUserPosts({ data: tempUserPosts });
        setTextAreaText('');
      });
    });
  };

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  useEffect(() => {
    // Get user from DB
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${userID}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then((user) => {

        // Get users from DB and set friends in state
        fetch(`${process.env.REACT_APP_API_DOMAIN}/users`, {
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        }).then((initRes) => {
          initRes.json().then((userList) => {
            const friendList = userList.filter(person => user.friends.includes(person._id));
            setFriends(friendList);
          });
        });
        setUser(user);
      });
    });

    // Get all user's posts
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${userID}/posts`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then((post_list) => {
        setUserPosts({ data: post_list });
      });
    });

  }, [token.token, userID]);

  return (
    <div className='profile-page'>
      <section className='hero-section'>
        <div className='user-image'><BsFillPersonFill /></div>
        {user && <h4 className='user-name'>{user.firstName} {user.lastName}</h4>}
        {user && <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>}
      </section>
      <main className='main-section'>
        {
          // Only display post form if currentUser
          user && user._id === token.user._id &&
          <form className='post-form' onSubmit={createPost}>
            <div className='text-area-container'>
              <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='What is on your mind?' required></textarea>
            </div>
            <button className='btn' type='submit'>Post</button>
          </form>
        }
        <div className='user-feed'>
          <section className='left-section'>
            Friends: 
            {
              friends && friends.map((friend) => {
                return <p key={friend._id}>{friend.firstName}</p>
              })
            }
          </section>
          <div className='post-feed'>
            {
              userPosts &&
              userPosts.data.map(post => {
                return <Post key={post._id} posts={userPosts} setPosts={setUserPosts} post={post} />
              })
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;