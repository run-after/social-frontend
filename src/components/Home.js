import '../styles/Home.css';
import { useState, useEffect } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { BsFillPeopleFill, BsFillImageFill } from 'react-icons/bs';
import ImageModal from './ImageModal';

function Home(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [posts, setPosts] = useState([]);
  const [textAreaText, setTextAreaText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
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
        body: JSON.stringify({ 'content': e.target.content.value, 'author': token.user._id })
      }).then((initRes) => {
        initRes.json().then((res) => {
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            let tempPosts = [...posts];
            res.author = token.user
            tempPosts.unshift(res);
            setPosts(tempPosts);
            setTextAreaText('');
            setErrorMessage(null);
          }
        });
      });
    };
  };

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  const uploadImage = () => {
    setShowImageModal(!showImageModal);
  };

  useEffect(() => {
    if (!props.checkIfTokenIsExpired()) {
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts`, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then((initRes) => {
        initRes.json().then((posts) => {
          const postFeed = posts.filter(post =>
            token.user.friends.includes(post.author._id) || post.author._id === token.user._id);
          setPosts(postFeed);
        });
      });
    };
  }, [token.token, token.user._id]);

  return (
    <div className="home">
      <div className='left-column'>
        <Link className='current-user' to={`/users/${token.user._id}`}>
          <img className='left-column-image' src={token.user.avatar} alt={`${token.user.firstName}'s avatar`} />
          {token.user.firstName} {token.user.lastName}
        </Link>
        <Link className='friends' to='/friends'>
          <div className='left-column-image'>
            <BsFillPeopleFill />
          </div>
          Friends
        </Link>
        <Link className='weather-link' to='/weather'>
          <img className='left-column-image' src='https://social-bucket.s3.us-east-2.amazonaws.com/weather.png' alt='weather' />
          Weather
        </Link>
      </div>
      <div className='post-feed'>
        {showImageModal && <ImageModal closeModal={uploadImage} userPosts={posts} setUserPosts={setPosts} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />}
        <div className='post-form-container'>
          <form className='post-form' onSubmit={createPost}>
            <div className={`text-area-container ${errorMessage && 'highlight-error'}`}>
              {<div className='error-message'>{errorMessage}</div>}
              <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='What is on your mind?' required></textarea>
            </div>
            <button className='btn' type='submit'>Post</button>
          </form>
          <button className='btn' onClick={uploadImage}><BsFillImageFill /></button>
        </div>
        
        {posts && posts.map((post) => {
          return <Post key={post._id} posts={posts} setPosts={setPosts} post={post} checkIfTokenIsExpired={props.checkIfTokenIsExpired}/>;
        })
        }
      </div>
    </div>
  );
}

export default Home;

// When i add token.user.friends to dependency array on useEffect it keeps
// making calls to api

// My  button for friends on left column goes to user page... not a page 
// full of actual friends