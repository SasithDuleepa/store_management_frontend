import React from 'react'
import './pos.css'

import Catergory from '../components/catergory/catergory'
import Item from '../components/item/item'
import Bill_item from '../components/bill_item/bill_item'
import oncash from '../components/icons/cash-on.png';
import cashback from '../components/icons/cash-back.png'

export default function Pos() {
  return (
  
<div class="parent">
    <div class="div1">
        <div className='bill_div'>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>
          <Bill_item/>


        </div>
        
  
    </div>
    <div class="div2">
        <div className='bill_summery_div'>
            <div className='customer_div'>
            <p>customer  </p>
            <p>abc</p>
            </div>
            <div className='bill_id_div'>
            <p>bill id  </p>
            <p>Bill-000000</p>
            </div>
            <div className='payment_method_div'>
                <p>payment method</p>
                <div>
                    <img className='oncash' src={oncash} alt="" />
                    <img className='cashback' src={cashback} alt="" />
                
                </div>
            </div>
            <div className='dot_line'></div>
            <div className='summery_total_div'>
                <p className='total_p' >total </p>
                <p className='total'> $ 100</p>
            </div>
            
            <div className='button_div'>
                <button className='button'>print</button>
            </div>

        </div>

    
    </div>
    <div class="div3">
        <div className='category_div'>
            <Catergory/>
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 

            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 
            <Catergory/> 

        </div>
     
    </div>
    <div class="div4">
        <div className='item_div'>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>

        </div>
        



    </div>
</div>

 
  )
}
