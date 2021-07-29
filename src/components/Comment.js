import '../styles/Comment.css';
import { useState, useEffect } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';

function Comment(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [commentLikes, setCommentLikes] = useState({ data: [] });
  const [commentIsLiked, setCommentIsLiked] = useState(false);

  const changeLikeStatus = (commentID) => {

    // If user has already liked comment...
    if (commentIsLiked) {
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.comment.post}/comments/${commentID}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then(initRes => {
        initRes.json().then(res => {
          setCommentIsLiked(false);
          let tempCommentLikes = commentLikes.data.filter(like => (like.comment !== commentID) && (like.user !== token.user._id));
          setCommentLikes({ data: tempCommentLikes });
        });
      });
    } else {
      // If user hasn't already liked comment...
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.comment.post}/comments/${commentID}/likes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then(initRes => {
        initRes.json().then(res => {
          setCommentIsLiked(true);
          let tempCommentLikes = commentLikes.data;
          tempCommentLikes.push(res);
          setCommentLikes({ data: tempCommentLikes });
        });
      });
    };

  };

  useEffect(() => {
    // Get all likes for comment
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.comment.post}/comments/${props.comment._id}/likes`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then(initRes => {
      initRes.json().then(like_list => {
        if (like_list.message) {
          //Not sure what to do - maybe a 404
        } else {
          setCommentLikes({ data: like_list });
          like_list.forEach((like) => {
            if (like.user === token.user._id) {
              setCommentIsLiked(true);
            } else {
              setCommentIsLiked(false);
            };
          });
        }
      })
    })
  }, [props.comment.post, props.comment._id, token.token, token.user._id])
  
  return (
      <div className='comment'>
        <div className='comment-avatar'></div>
        <div className='comment-content'>
          <h6 className='comment-author'>{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</h6>
          {props.comment.content}
          <button className='comment-like-button' onClick={() => { changeLikeStatus(props.comment._id) }}>{(!commentIsLiked && 'Like') || 'Unlike'}</button>
      <span className='like-count'><FaRegThumbsUp />{commentLikes.data.length}</span>
      </div>
      </div>
  );
}

export default Comment;