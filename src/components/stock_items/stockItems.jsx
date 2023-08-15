import { useState , useEffect } from 'react';
import Edite from '../icons/edit.png';
import './stockItems.css'

export default function StockItems(props) {
    const [image, setImage] = useState();
  return (
    <div className='stockitem'>
    <a ><img onClick={props.editeFunction} className='stockitem-edite-icon' src={Edite} /></a>
     
      
      <div>
          <p className='stockitem-name'>{props.itemName}</p>
          <p className='stockitem-catergory'>catergory :{props.catergory}</p>
          <p className='stockitem-qty'>Stock qty :{props.stock_qty}</p>
          <p className='stockitem-takingprice'>taking price :{props.taking_price}</p>
          <p className='stockitem-sellingprice'>selling price :{props.selling_price}</p>
          <p className='stockitem-batchno'>batch no :{props.batch_no}</p>
          <p className='stockitem-expdate'>exp date :{props.exp_date}</p>
          <p className='stockitem-location'>location :{props.location}</p>


      </div>
      
  
      
  </div>
  )
}
