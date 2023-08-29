import { useState , useEffect } from 'react';
import Edite from '../icons/edit.png';
import './itemsetting.css'

export default function Itemsetting(props) {
  const [image, setImage] = useState(); 
  useEffect(() => {
    async function fetchImage() {
      const img_name = props.ItemFile_name;

      if (img_name === null || img_name === undefined || img_name === 'null') {
        setImage('null');
      } else {
        setImage(img_name);
      }
    }

    fetchImage();
  }, [props.ItemFile_name]);
  return (
    <div className='item'>
      <a ><img onClick={props.editeFunction} className='item-setting-edite-icon' src={Edite} /></a>
       
        <div className='item-icon'>
          <img className='curry-icon-img' src={`${process.env.REACT_APP_BACKEND_URL}/items/file/?ItemFile=${image}`}  alt="" />
        </div>
        <div>
            <div className='item-name'><h3 className='item-name-text'>{props.itemname}</h3></div>
            <div className='item-catergory'><p className='item-catergory-text'>{props.catergory}</p></div>

        </div>
        
    
        
    </div>
  )
}
