import React from 'react'
import './item.css'
import dhal from './../icons/Dhall.jpg'

export default function Item(props) {
  return (
    
        <div className='item-container_'>
            <div className='item-image'>
                <img className='item-img' src={dhal} alt="" />
            </div>
            <div className='item-info'>
                <h1 className='item-name'>{props.itemName}</h1>
                <p className='item-price'>{props.price}</p>
                <p className='item-available'>available {props.qty}</p>
            </div>
           


        </div>
    
  )
}
