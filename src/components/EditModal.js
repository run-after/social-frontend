import '../styles/EditModal.css';

function EditModal(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const editContent = (e) => {
    e.preventDefault();

    if (props.type === 'post') {
      fetch(`${process.env.REACT_APP_API_DOMAIN}/posts/${props.content._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify({ content: e.target.content.value })
      }).then(initRes => {
        console.log(initRes)
        initRes.json().then(res => {
          props.closeModal();
          // Update post in state
          console.log(res)
        });
      });
    } else {
      // Edit comment
    };

  };
  
  return (
    <div className='edit-modal'>
      <div className='edit-form'>
        <header className='edit-form-header'>
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

export default EditModal;