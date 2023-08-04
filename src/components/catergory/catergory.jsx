import React from 'react'
import './catergory.css'

import Curry from '../icons/curry.png'

export default function Catergory() {
  return (
    <div className='category'>
        <div className='category-icon'>
          <img className='curry-icon-img' src={Curry} alt="" />
        </div>
        <div>
            <div className='category-name'><h3 className='category-name-text'>Curry Powder</h3></div>
            <div className='category-availability'><p className='category-availability-text'>10 items</p></div>

        </div>
        
    
        
    </div>
  )
}
