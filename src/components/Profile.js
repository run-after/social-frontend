import '../styles/Profile.css';
import Post from './Post';
import EditUserModal from './EditUserModal';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsPencil, BsFillImageFill } from 'react-icons/bs';
import ImageModal from './ImageModal';

function Profile(props) {

  const token = JSON.parse(localStorage.getItem('token'));
  const { userID } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [textAreaText, setTextAreaText] = useState('');
  const [friends, setFriends] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const createPost = (e) => {
    e.preventDefault();
    if (!props.checkIfTokenIsExpired()) {
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
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            let tempUserPosts = [...userPosts];
            res.author = user
            tempUserPosts.unshift(res);
            setUserPosts(tempUserPosts);
            setTextAreaText('');
            setErrorMessage(null);
          };
        });
      });
    };
  };

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  const editUser = () => {
    if (!props.checkIfTokenIsExpired()) {
      setShowEditModal(!showEditModal);
    };
  };

  const deleteAccount = () => {
    if (!props.checkIfTokenIsExpired()) {
      if (window.confirm('Are you sure you want to delete this account?')) {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${token.user._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        }).then(() => {
          props.logOut();
        });
      };
    };
  };

  const uploadImage = () => {
    setShowImageModal(!showImageModal);
  };

  useEffect(() => {
    if (!props.checkIfTokenIsExpired()) {
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
          setUserPosts(post_list);
        });
      });
    };
  }, [token.token, userID]);

  return (
    <div className='profile-page'>
      <section className='hero-section'>
        {showEditModal && <EditUserModal closeModal={editUser} user={user} setUser={setUser} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />}
        {showImageModal && <ImageModal closeModal={uploadImage} userPosts={userPosts} setUserPosts={setUserPosts} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />}
        <div className='user-image-backdrop'>
          {user && <img className='user-avatar' src={user.avatar} alt={`${user.firstName}'s avatar`} />}
          {
            user && 
            (user._id === token.user._id &&
            <button onClick={editUser} className='edit-user-btn'><BsPencil /></button>)
          }
        </div>
        {user && <h4 className='user-name'>{user.firstName} {user.lastName}</h4>}
        {user && <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>}
        {
          user && 
          (user._id === token.user._id &&
          <button className='btn' onClick={deleteAccount}>Delete account</button>)
        }
      </section>
      <main className='main-section'>
        {
          // Only display post form if currentUser
          user && user._id === token.user._id &&
          <div className='post-form-container'>
            <form className='post-form' onSubmit={createPost}>
            <div className={`text-area-container ${errorMessage && 'highlight-error'}`}>
              {<div className='error-message'>{errorMessage}</div>}
              <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='What is on your mind?' required />
            </div>
            <button className='btn' type='submit'>Post</button>
            </form>
            <button className='btn' onClick={uploadImage}><BsFillImageFill /></button>
          </div>
        }
        <div className='user-feed'>
          <section className='left-section'>
            <h5 className='title'>Friends</h5>
            <p className='friend-count'>{`${friends && friends.length} friends`}</p>
            <div className='friend-tiles'>
              {
                friends && friends.map((friend) => {
                  return (
                    <Link key={friend._id} className='friend' to={`/users/${friend._id}`}>
                      <img className='friend-avatar' src={friend.avatar} alt={`${friend.firstName}'s avatar`} />
                      <p className='friend-name'>{`${friend.firstName} ${friend.lastName}`}</p>
                    </Link>
                  )
                })
              }
            </div>
          </section>
          <div className='post-feed'>
            {
              userPosts &&
              userPosts.map(post => {
                return <Post key={post._id} posts={userPosts} setPosts={setUserPosts} post={post} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />
              })
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;