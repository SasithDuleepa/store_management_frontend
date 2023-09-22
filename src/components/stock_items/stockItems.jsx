import { useState , useEffect } from 'react';
import Edite from '../icons/edit.png';
import './stockItems.css'

export default function StockItems(props) {
    const [image, setImage] = useState();
  return (
    <div className='stockitem'>
    <a ><img onClick={props.editeFunction} className='stockitem-edite-icon' src={Edite} /></a>
     
      
      <div className='stockitem_div'>
          <p className='stockitem-name'>{props.itemName}</p>
          <div className='stock-item-div'><p className='stockitem-catergory'>catergory : </p><p className='stockitem-props'>{props.catergory}</p></div>
          <div className='stock-item-div'><p className='stockitem-qty'>Stock qty : </p><p className='stockitem-props'>{props.stock_qty}</p></div>
          <div className='stock-item-div'><p className='stockitem-takingprice'>taking price : </p><p className='stockitem-props'>{props.taking_price}</p></div>
          <div className='stock-item-div'><p className='stockitem-sellingprice'>selling price : </p><p className='stockitem-props'>{props.selling_price}</p></div>
          <div className='stock-item-div'> <p className='stockitem-batchno'>batch no : </p><p className='stockitem-props'>{props.batch_no}</p></div>
          <div className='stock-item-div'><p className='stockitem-expdate'>exp date : </p><p className='stockitem-props'>{props.exp_date}</p></div>
          <div className='stock-item-div'><p className='stockitem-location'>location : </p><p className='stockitem-props'>{props.location}</p></div>
          <div className='stock-item-div'><p className='stockitem-location'>available qty : </p><p className='stockitem-props'>{props.available}</p></div>
          <div className='stock-item-div'><p className='stockitem-supplier'>supplier : </p><p className='stockitem-props'>{props.supplier}</p></div>
          <div className='stock-item-div'><p className='stockitem-date'>date : </p><p className='stockitem-props'>{props.date}</p></div>
          
          
          
          
         
          
          


      </div>
      
  
      
  </div>
  )
}
