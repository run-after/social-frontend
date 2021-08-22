import '../styles/EditUserModal.css';
import { BsX } from 'react-icons/bs';
import ImageUploader from 'react-images-upload';
import { useState } from 'react';

function EditUserModal(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [picture, setPicture] = useState(null);
  
  const onDrop = (pic) => {
    setPicture(pic[0]);
  };

  const editUser = (e) => {
    e.preventDefault();
    if (!props.checkIfTokenIsExpired()) {
      if (picture) {
        let formData = new FormData();
        formData.append('name', new Date().toString());
        formData.append('image', picture);
        // upload avatar to S3
        fetch(`${process.env.REACT_APP_API_DOMAIN}/imageUpload/${props.user._id}/avatar-upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.token}`
          },
          body: formData
        }).then(initRes => {
          initRes.json().then(imageURL => {
            // update user
            let tempUser = {};
            Object.assign(tempUser, props.user);
            tempUser.firstname = e.target.firstName.value;
            tempUser.lastName = e.target.lastName.value;
            tempUser.avatar = imageURL;
            fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${props.user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
              },
              body: JSON.stringify(tempUser)
            });
            token.user = tempUser;
            props.setUser(tempUser);
            localStorage.setItem('token', JSON.stringify(token));
          });
        });
      } else {
        let tempUser = {};
        Object.assign(tempUser, props.user);
        tempUser.firstName = e.target.firstName.value;
        tempUser.lastName = e.target.lastName.value;
        fetch(`${process.env.REACT_APP_API_DOMAIN}/users/${props.user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
          },
          body: JSON.stringify(tempUser)
        });
        token.user = tempUser;
        props.setUser(tempUser);
        localStorage.setItem('token', JSON.stringify(token));
      };
      props.closeModal();
    };
  };
  
  return (
    <div className='edit-user-modal'>
      <div className='edit-form'>
        <header className='edit-form-header'>
          <button className='close-modal-button' onClick={props.closeModal}><BsX /></button>
          Edit profile
        </header>
        <div className='edit-form-content'>
          <form onSubmit={editUser} className='edit-form-form'>
            <ImageUploader
              withIcon={true}
              buttonText='Choose Image'
              onChange={onDrop}
              imgExtension={['.jpeg', '.jpg', '.gif', '.png']}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
              />
            <input name='firstName' id='firstName' defaultValue={props.user.firstName} />
            <input name='lastName' id='lastName' defaultValue={props.user.lastName} />
            <button type='submit' className='btn'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;