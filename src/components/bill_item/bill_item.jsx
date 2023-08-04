import React from 'react'
import './bill_item.css'

import minus from '../icons/minus.png';
import more from '../icons/more.png';

export default function Bill_item() {
  return (
    <div>
        <div className='bill_item_container'>

            <p className='bill_item_name'>Dhal 500g </p>
            <p className='bill_item_price'> x </p>
            <p className='bill_item_quantity'> 2  </p>
            <p className='bill_item_price'> = 500.00  </p>
            <div>
            <a><img className='bill_item_more_img' src={more} alt="" /></a>
            <a><img className='bill_item_minus_img' src={minus} alt="" /></a>

            </div>
            
        </div>
    </div>
  )
}
