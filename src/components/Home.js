import '../styles/Home.css';
import { useState, useEffect } from 'react';
import Post from './Post';

function Home() {

  const token = JSON.parse(localStorage.getItem('token'));

  const [posts, setPosts] = useState({data: []});
  const [textAreaText, setTextAreaText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const createPost = (e) => {
    e.preventDefault();
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
          let tempPosts = posts.data;
          res.author = token.user
          tempPosts.unshift(res);
          setPosts({ data: tempPosts });
          setTextAreaText('');
          setErrorMessage(null);
        }
      });
    });
  };

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then((posts) => {
        const postFeed = posts.filter(post =>
          token.user.friends.includes(post.author._id) || post.author._id === token.user._id);
        setPosts({ data: postFeed });
      });
    });
  }, [token.token, token.user._id]);

  return (
    <div className="home">
      <div className='left-column'>Left</div>
      <div className='post-feed'>
        <form className='post-form' onSubmit={createPost}>
          {<div className='error-message'>{errorMessage}</div>}
          <div className='text-area-container'>
            <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='What is on your mind?' required></textarea>
          </div>
          <button className='btn' type='submit'>Post</button>
        </form>
        {posts && posts.data.map((post) => {
          return <Post key={post._id} posts={posts} setPosts={setPosts} post={post} />;
        })
        }
      </div>
    </div>
  );
}

export default Home;

// When i add token.user.friends to dependency array on useEffect it keeps
// making calls to api