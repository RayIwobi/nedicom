import React, { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      //axios.post('http://localhost:5000/upload', formData , { withCredentials: true });
      axios.post('https://nedifoods-api.vercel.app/upload', formData , { withCredentials: true });
      alert('Image uploaded!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadImage;
