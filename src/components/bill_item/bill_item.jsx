import React from 'react'
import './bill_item.css'

import minus from '../icons/minus.png';
import more from '../icons/more.png';
import Delete from '../icons/delete.png';

export default function BillItem(props) {
  return (
    <div>
        <div className='bill_item_container'>

            <p className='bill_item_name'>{props.itemName} </p>
            <p className='bill_item_price'>$ {props.price} </p>
            <p className=''> x </p>
            {/* <p className='bill_item_quantity'> {props.qty}  </p> */}
            <input className='bill_item_quantity_input' onChange={(e)=>props.ItemQtyHandler(e)} value={props.qty}/>
            <p className='bill_item_total_price'> = {props.totalprice} </p>
            
            <div>
            <a><img className='bill_item_delete_img' src={Delete} alt="" onClick={props.delete}/></a>
            

            </div>
            
        </div>
    </div>
  )
}
