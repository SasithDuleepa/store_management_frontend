import React from 'react'
import './item.css'
import dhal from './../icons/Dhall.jpg'

export default function Item() {
  return (
    
        <div className='item-container_'>
            <div className='item-image'>
                <img className='item-img' src={dhal} alt="" />
            </div>
            <div className='item-info'>
                <h1 className='item-name'>Dhal 500g</h1>
                <p className='item-price'>Rs.500</p>
                <p className='item-available'>available in 2 pcs</p>
            </div>
           


        </div>
    
  )
}
