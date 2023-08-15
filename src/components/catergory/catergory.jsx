import React from 'react'
import './catergory.css'

import Curry from '../icons/curry.png'

export default function Catergory_(props) {
  return (
    <div className='category'>
        <div className='category-icon'>
          <img className='curry-icon-img' src={Curry} alt="" />
        </div>
        <div>
            <div className='category-name'><h3 className='category-name-text'>{props.Catergory_name}</h3></div>
            <div className='category-availability'><p className='category-availability-text'>{props.Catergory_items}</p></div>

        </div>
        
    
        
    </div>
  )
}
