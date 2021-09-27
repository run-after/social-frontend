import '../styles/ImageModal.css';
import { BsX } from 'react-icons/bs';
import ImageUploader from 'react-images-upload';
import { useState } from 'react';

function ImageModal(props) {

  const token = JSON.parse(localStorage.getItem('token'));

  const [picture, setPicture] = useState(null);
  
  const onDrop = (pic) => {
    setPicture(pic[0]);
  };

  const createImagePost = (e) => {
    e.preventDefault();
    if (!props.checkIfTokenIsExpired()) {
      if (picture) {
        let formData = new FormData();
        formData.append('name', new Date().toString());
        formData.append('image', picture);
        // upload image to S3
        fetch(`${process.env.REACT_APP_API_DOMAIN}/imageUpload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.token}`
          },
          body: formData
        }).then(initRes => {
          initRes.json().then(imageURL => {
            // API CALL TO CREATE POST
            fetch(`${process.env.REACT_APP_API_DOMAIN}/posts`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
              },
              body: JSON.stringify({ 'isPicture': true, 'author': token.user._id, content: imageURL })
            }).then((initRes) => {
              initRes.json().then((res) => {
                let tempUserPosts = [...props.userPosts];
                res.author = token.user
                tempUserPosts.unshift(res);
                props.setUserPosts(tempUserPosts);
              });
            });
          });
        });
      };
    };
    props.closeModal();
  };
  
  return (
    <div className='image-upload-modal'>
      <form className='image-upload-form' onSubmit={createImagePost}>
        <button className='close-modal-button' onClick={props.closeModal}><BsX /></button>
        <ImageUploader
          withIcon={true}
          buttonText='Choose Image'
          onChange={onDrop}
          imgExtension={['.jpeg', '.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
        />
        <button className='upload-image-btn btn' type='submit'>Create Post</button>
      </form>
    </div>
  );
}

export default ImageModal;