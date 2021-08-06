import '../styles/Comment.css';
import { useState, useEffect } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import EditModal from './EditModal';

function Comment(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [commentLikes, setCommentLikes] = useState({ data: [] });
  const [commentIsLiked, setCommentIsLiked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [comment, setComment] = useState(props.comment);

  const changeLikeStatus = (commentID) => {
    if (!props.checkIfTokenIsExpired()) {
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
  };

  const editComment = () => {
    if (!props.checkIfTokenIsExpired()) {
      setShowEditModal(!showEditModal);
    };
  };

  const deleteComment = () => {
    if (!props.checkIfTokenIsExpired()) {
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${comment.post}/comments/${comment._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).then((res) => {
        res.json().then((res) => {
          let comments = props.postComments.data.filter(comment => comment._id !== props.comment._id);
          props.setPostComments({ data: comments });
        });
      });
    };
  };

  useEffect(() => {
    if (!props.checkIfTokenIsExpired()) {
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
          };
        });
      });
    };
    
  }, [props.comment.post, props.comment._id, token.token, token.user._id])
  
  return (
    <div className='comment'>
      {showEditModal && <EditModal type='comment' closeModal={editComment} content={comment} setComment={setComment} checkIfTokenIsExpired={props.checkIfTokenIsExpired} />}
        <div className='comment-avatar'></div>
        <div className='comment-content'>
          <h6 className='comment-author'>{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</h6>
          <div className='comment-button-container'>
            {
              props.comment.author._id === token.user._id &&
              <button className='edit-comment-button' onClick={editComment}><BsPencil /></button> 
            }
            {
              props.comment.author._id === token.user._id &&
              <button className='delete-comment-button' onClick={deleteComment}><BsTrashFill /></button>
            }
          </div>
          {comment.content}
          <button className='comment-like-button' onClick={() => { changeLikeStatus(props.comment._id) }}>{(!commentIsLiked && 'Like') || 'Unlike'}</button>
          <span className='like-count'><FaRegThumbsUp />{commentLikes.data.length}</span>
        </div>
    </div>
  );
}

export default Comment;