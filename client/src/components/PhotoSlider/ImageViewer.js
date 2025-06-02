import React, { useState } from 'react';
import axios from 'axios';

function ImageViewer({ imageId }) {
  const [imageURL, setImageURL] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`https://nedifoods-api.vercel.app/images/${imageId}`, {
        responseType: 'blob', // <== this is important!
      });

      const url = URL.createObjectURL(response.data); // create blob URL
      setImageURL(url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchImage}>Load Image</button>
      {imageURL && <img src={imageURL} alt="Fetched from DB" style={{ width: '300px' }} />}
    </div>
  );
}

export default ImageViewer;
