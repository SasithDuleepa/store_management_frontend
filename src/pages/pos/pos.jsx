import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './pos.css'

import Catergory from '../../components/catergory/catergory'
import Item from '../../components/item/item'
import Bill_item from '../../components/bill_item/bill_item'
import oncash from '../../components/icons/cash-on.png';
import cashback from '../../components/icons/cash-back.png'



export default function Pos() {
    //selected catergory
    const [selectedCatergory, SetSelectedCatergory] = useState("");


    //get all catergories
    const [AllCatergory, SetCatergory] = useState([]);
    const GetCatergories = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
        console.log(res.data);
        SetCatergory(res.data);
    }
    useEffect(() => {
        GetCatergories();
    }
    , [])


    //selectcatergory
    const selectcatergory =(catergory_name)=> (e) => {
        console.log(catergory_name);
        SetSelectedCatergory(catergory_name);
    }

    //get storeitems according to catergory
    const[items, setItems] = React.useState([]);
    const GetstockItems = async () => {
        console.log('lhjkvblnknkbkhj,k.')
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/stock/AccToCatergory/?catergory=${selectedCatergory}`);
        console.log(res.data);
        setItems(res.data);
    
    }
    useEffect(() => {
        GetstockItems();
    }
    , [selectedCatergory])


    //select item function
    const[bill_items, setBill_items] = React.useState([]);
    const selectItem =(stock_id,item_name,batch_no,available_qty,selling_price,expire_date)=> (e) => {
        console.log(stock_id,item_name,available_qty,selling_price)
       
        setBill_items(bill_items => [...bill_items,
            {
                stock_id:stock_id,
                item_name:item_name,
                batch_no:batch_no,
                available_qty:available_qty,
                selling_price:selling_price,
                expire_date:expire_date,
                item_qty:1,

    }
        ]);
    }

    const itemQtyHandler = (stock_id, item_name, batch_no, available_qty, selling_price, expire_date, index) => (e) => {
        const newBillItems = [...bill_items];
        newBillItems[index] = {
            ...newBillItems[index],
            item_qty: e.target.value,
            totalprice: e.target.value * selling_price,
        };
    
        setBill_items(newBillItems);
    };



  return (
  
<div class="parent">
    <div class="div1">
        <div className='bill_div'>

          {/* <Bill_item itemName='eeeee' qty='3' price='44' totalprice='44' /> */}
          {bill_items.map((item, index) => (
    <Bill_item 
        key={index}
        itemName={item.item_name} 
        price={item.selling_price}
        qty={item.item_qty} 
        ItemQtyHandler={itemQtyHandler(item.stock_id, item.item_name, item.batch_no, item.available_qty, item.selling_price, item.expire_date, index)}
        totalprice={item.selling_price * item.item_qty}
       
    />
))}
         

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
                <p className='total'>
                    {bill_items.reduce((acc, item) => acc + item.selling_price * item.item_qty, 0)}
                </p>
            </div>
            
            <div className='button_div'>
                <button className='button'>print</button>
            </div>

        </div>

    
    </div>
    <div class="div3">
        <div className='category_div'>
            
            {AllCatergory.map((item) => (
                <a onClick={selectcatergory(
                    item.catergory_name
                )}>
                    <Catergory 
                Catergory_name={item.catergory_name} 
                // Catergory_items={item.catergory_items} 
                />

                </a>
                

                ))}



        </div>
     
    </div>
    <div class="div4">
        <div className='item_div'>
        {/* <Item itemName='' itemprice='' qty='' price=''/> */}
       
       {items.map((item) => (
        <a onClick={selectItem(item.stock_id,item.item_name,item.batch_no,item.available_qty,item.selling_price,item.expire_date)}>
            <Item
        itemName={item.item_name}
        qty={item.available_qty}
        price={item.selling_price}
        />
        </a>
        
        ))}
    


















        </div>
        



    </div>
</div>

 
  )
}
