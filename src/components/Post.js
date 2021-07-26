import '../styles/Post.css';
import { BsFillTrashFill, BsPencil, BsChatDots } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa';
import Comment from './Comment';
import { useState, useEffect } from 'react';

function Post(props) {
  const token = JSON.parse(localStorage.getItem('token'));

  const [postComments, setPostComments] = useState({ data: [] });
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayComments, setDisplayComments] = useState(false);
  const [textAreaText, setTextAreaText] = useState('');

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  const deletePost = (postID) => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((res) => {
      res.json().then((res) => {
        let posts = props.posts.data.filter(post => post._id !== props.post._id);
        props.setPosts({ data: posts });
      });
    });
  };

  const createComment = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.post._id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify({ 'content': textAreaText, 'author': token.user })
    }).then((initRes) => {
      initRes.json().then((comment) => {
        if (comment.message) {
          setErrorMessage(comment.message);
        } else {
          let tempPostComments = postComments.data;
          comment.author = token.user;
          tempPostComments.unshift(comment);
          setPostComments({ data: tempPostComments });
          setTextAreaText('');
        };
      });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.post._id}/comments`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((initRes) => {
      initRes.json().then((comment_list) => {
        setPostComments({ data: comment_list });
      });
    });
  }, [token.token, props.post._id])

  return (
    <div className='post'>
      <div className='post-header'>
        <span className='post-author'>{props.post.author.firstName} {props.post.author.lastName}</span>
        <span className='post-time'>{new Date(props.post.createdAt).toLocaleString()}</span>
        {
          props.post.author._id === token.user._id &&
          <button onClick={() => deletePost(props.post._id)} className='delete-button'><BsFillTrashFill /></button>
        }
        {
          props.post.author._id === token.user._id &&
          <button className='edit-button'><BsPencil /></button>
        }
      </div>
      <div className='post-content'>
        {props.post.content}
      </div>
      <div className='action-buttons'>
        <button className='action-button'><FaRegThumbsUp />Like</button>
        <button className='action-button' onClick={() => { setDisplayComments(!displayComments) }}><BsChatDots />Comment</button>
      </div>
      {
        
        displayComments &&
        <div className='comments'>
          <form className='comment-form' onSubmit={createComment}>
            <div className='comment-avatar'></div>
            {<div className='error-message'>{errorMessage}</div>}
            <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='Write comment...' required />
            <button className='create-comment-button btn'>Submit</button>
          </form>
          {
            postComments.data.map(comment => {
              return <Comment key={comment._id} comment={comment} />;
            })
          }
        </div>
      }
        
    </div>
  );
}

export default Post;

// Error message for comment form needs to be addressed