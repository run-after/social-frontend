import '../styles/EditContentModal.css';
import { BsX } from 'react-icons/bs';

function EditContentModal(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const editContent = (e) => {
    e.preventDefault();
    if (!props.checkIfTokenIsExpired()) {
      if (props.type === 'post') {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.content._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
          },
          body: JSON.stringify({ content: e.target.content.value })
        }).then(initRes => {
          initRes.json().then(res => {
            props.closeModal();
            props.setPost(res);
          });
        });
      } else {
        // Edit comment
        fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.content.post}/comments/${props.content._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
          },
          body: JSON.stringify({ content: e.target.content.value })
        }).then(initRes => {
          initRes.json().then(res => {
            props.closeModal();
            props.setComment(res);
          });
        })
      };
    };
  };
  
  return (
    <div className='edit-modal'>
      <div className='edit-form'>
        <header className='edit-form-header'>
          <button className='close-modal-button' onClick={props.closeModal}><BsX /></button>
          Edit {props.type}
        </header>
        <div className='edit-form-content'>
          <form onSubmit={editContent} className='edit-form-form'>
            <input name='content' id='content' defaultValue={props.content.content} />
            <button type='submit' className='btn'>Save</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default EditContentModal;