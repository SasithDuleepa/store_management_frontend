import React from 'react'
import { useState , useEffect } from 'react';
import './catergory.css'

import Curry from '../icons/curry.png'

export default function Catergory_(props) {
  const [image, setImage] = useState(); // Default image or loading indicator

  useEffect(() => {
    async function fetchImage() {
      const img_name = props.catergoryFile_name;

      if (img_name === null || img_name === undefined || img_name === 'null') {
        setImage('null');
      } else {
        setImage(img_name);
      }
    }

    fetchImage();
  }, [props.catergoryFile_name]);

  return (
    <div className='category'>
        <div className='category-icon'>
          <img className='curry-icon-img' src={`${process.env.REACT_APP_BACKEND_URL}/file/?CatergoryFile=${image}`} alt="" />
        </div>
        <div>
            <h3 className='category-name-text'>{props.Catergory_name}</h3>
            <div className='category-availability'><p className='category-availability-text'>{props.Catergory_items}</p></div>

        </div>
        
    
        
    </div>
  )
}
