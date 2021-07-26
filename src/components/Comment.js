import '../styles/Comment.css';

function Comment(props) {
  
  return (
    <div className='comment'>
      <div className='comment-avatar'></div>
      <div className='comment-content'>
        <h6 className='comment-author'>{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</h6>
        {props.comment.content}
      </div>
    </div>
  );
}

export default Comment;