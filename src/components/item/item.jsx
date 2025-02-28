import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import './item.css'
import dhal from './../icons/Dhall.jpg'

export default function Item(props) {
    const [itemname, setItemname] = useState(); 
  useEffect(() => {
    async function fetchImage() {
      const item_name = props.itemName;

      if (item_name === null || item_name === undefined || item_name === 'null') {
        setItemname('null');
      } else {
        setItemname(item_name);
      }
    }

    fetchImage();
  }, [props.itemName]);



  return (
    
        <div className='item-container_'>
            <div className='item-image'>
                <img className='item-img' src={`${process.env.REACT_APP_BACKEND_URL}/items/itemname/?ItemName=${props.itemName}`} alt="" />
            </div>
            <div className='item-info'>
                <h1 className='item_name'>{props.itemName}</h1>
                <p className='item-price'>${props.price}</p>
                <p className='item-available'>available {props.qty}</p>
            </div>
           


        </div>
    
  )
}
