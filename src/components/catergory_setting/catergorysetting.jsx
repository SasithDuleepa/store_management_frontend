import React from 'react';
import Axios from 'axios';
import './catergorysetting.css';
import Curry from '../icons/curry.png';
import Edite from '../icons/edit.png';
import { useState , useEffect } from 'react';

export default function CatergorySetting(props) {

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
    <div className='categorysetting'>
        <a ><img onClick={props.editeFunction} className='catergorysetting-edite-icon' src={Edite} /></a>
       
        <div className='categorysetting-icon'>
          <img className='categorysetting-icon-img' src={`http://localhost:8080/file/?CatergoryFile=${image}`} alt="" />
        </div>
        <div>
            <div className='categorysetting-name'><h3 className='categorysetting-name-text'>{props.catergory_name}</h3></div>
            

        </div>
        
    
        
    </div>
  )
}
