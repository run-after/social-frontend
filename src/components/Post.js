import '../styles/Post.css';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';

function Post(props) {
  const token = JSON.parse(localStorage.getItem('token'));

  const deletePost = (postID) => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }).then((res) => {
      res.json().then((res) => {
        let userPosts = props.userPosts.data.filter(post => post._id !== props.post._id);
        props.setUserPosts({ data: userPosts });
      });
    });
  };

  return (
    <div className='post'>
      <div className='post-header'>
        {props.post.author.firstName}
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
    </div>
  );
}

export default Post;