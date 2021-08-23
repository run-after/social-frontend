import '../styles/Post.css';
import { BsFillTrashFill, BsPencil, BsChatDots } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import EditModal from './EditContentModal';
import { Link } from 'react-router-dom';

function Post(props) {
  const token = JSON.parse(localStorage.getItem('token'));

  const [postComments, setPostComments] = useState({ data: [] });
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayComments, setDisplayComments] = useState(false);
  const [textAreaText, setTextAreaText] = useState('');
  const [postIsLiked, setPostIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState({ data: [] });
  const [showEditModal, setShowEditModal] = useState(false);
  const [post, setPost] = useState(props.post);

  const changeText = (e) => {
    setTextAreaText(e.target.value);
  };

  const deletePost = (postID) => {
    if (!props.checkIfTokenIsExpired()) {
      if (window.confirm('Are you sure you want to delete this post?')) {
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
    };
  };

  const editPost = () => {
    if (!props.checkIfTokenIsExpired()) {
      setShowEditModal(!showEditModal);
    };
  };

  const createComment = (e) => {
    e.preventDefault();
    if (!props.checkIfTokenIsExpired()) {
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
  };

  const changeLikeStatus = (postID) => {
    if (!props.checkIfTokenIsExpired()) {
      // If user has already liked post...
      if (postIsLiked) {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${postID}/likes`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        }).then(initRes => {
          initRes.json().then(res => {
            setPostIsLiked(false);
            let tempPostLikes = postLikes.data.filter(like => (like.post !== postID) && (like.user !== token.user._id));
            setPostLikes({ data: tempPostLikes });
          });
        });
      } else {
        // If user hasn't already liked post...
        fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${postID}/likes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        }).then(initRes => {
          initRes.json().then(res => {
            setPostIsLiked(true);
            let tempPostLikes = postLikes.data;
            tempPostLikes.push(res);
            setPostLikes({ data: tempPostLikes });
          });
        });
      };
    };
  };

  useEffect(() => {
    if (!props.checkIfTokenIsExpired()) {
      // Get all post comments
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.post._id}/comments`, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then((initRes) => {
        initRes.json().then((comment_list) => {
          setPostComments({ data: comment_list });
        });
      });

      // Get all post likes
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.post._id}/likes`, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then(initRes => {
        initRes.json().then(res => {
          if (res.message) {
            //Not sure what to do - maybe a 404
          } else {
            setPostLikes({ data: res });
            res.forEach((like) => {
              if (like.user === token.user._id) {
                setPostIsLiked(true);
              } else {
                setPostIsLiked(false);
              };
            });
          };
        });
      });
    };
  }, [token.token, props.post._id, token.user._id])

  return (
    <div className='post'>
      {showEditModal && <EditModal type='post' closeModal={editPost} content={post} setPost={setPost} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />}
      <div className='post-header'>
        <Link className='post-author' to={`/users/${props.post.author._id}`}>
          <img className='post-avatar' src={props.post.author.avatar} alt={`${props.post.author.firstName}'s avatar`} />
          {props.post.author.firstName} {props.post.author.lastName}
        </Link>
        <span className='post-time'>{new Date(props.post.createdAt).toLocaleString()}</span>
        {
          props.post.author._id === token.user._id &&
          <button onClick={() => deletePost(props.post._id)} className='delete-button'><BsFillTrashFill /></button>
        }
        {
          props.post.author._id === token.user._id &&
          <button onClick={() => editPost(props.post._id)} className='edit-button'><BsPencil /></button>
        }
      </div>
      <div className='post-content'>
        {
          (post.isPicture && <img src={post.content} alt={post.content} className='post-image'/>) ||
          post.content
        }
      </div>
      <div className='action-buttons'>
        <button className='action-button' onClick={() => { changeLikeStatus(props.post._id) }}><FaRegThumbsUp />{(!postIsLiked && 'Like') || 'Unlike'}</button>
        <button className='action-button' onClick={() => { setDisplayComments(!displayComments) }}><BsChatDots />Comment</button>
      </div>
      <span className='like-count'><FaRegThumbsUp /> {postLikes.data.length}</span>
      {
        displayComments &&
        <div className='comments'>
          <form className='comment-form' onSubmit={createComment}>
            <img className='comment-avatar' src={token.user.avatar} alt={`${token.user.firstName}'s avatar`} />
            <div className={`text-area-container ${errorMessage && 'highlight-error'}`}>
              {<div className='error-message'>{errorMessage}</div>}
              <textarea id='content' name='content' onChange={changeText} value={textAreaText} placeholder='Write comment...' required />
            </div>
            <button className='create-comment-button btn'>Submit</button>
          </form>
          {
            postComments.data.map(comment => {
              return <Comment key={comment._id} comment={comment} postComments={postComments} setPostComments={setPostComments} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />;
            })
          }
        </div>
      }
    </div>
  );
}

export default Post;