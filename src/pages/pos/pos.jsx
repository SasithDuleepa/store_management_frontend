import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './pos.css'
import { v4 as uuidv4 } from 'uuid';


import Catergory from '../../components/catergory/catergory'
import Item from '../../components/item/item'
import Bill_item from '../../components/bill_item/bill_item'
import oncash from '../../components/icons/cash-on.png';
import cashback from '../../components/icons/cash-back.png'





export default function Pos() {
    

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

    //selected catergory
    const [selectedCatergory, SetSelectedCatergory] = useState("");
    //selectcatergory
    const selectcatergory =(catergory_name)=> (e) => {
        console.log(catergory_name);
        SetSelectedCatergory(catergory_name);
    }

    //get storeitems according to catergory
    const[items, setItems] = React.useState([]);
    const GetstockItems = async () => {
        console.log('lhjkvblnknkbkhj,k.')
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/stock/AccToCatergory/?catergory_id=${selectedCatergory}`);
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

    //get all customers
    const[customers, setCustomers] = useState([]);
    const GetCustomers = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers`);
        console.log(res.data);
        setCustomers(res.data);
    }
    useEffect(() => {
        GetCustomers();
    }
    , [])
    //cutomer
    const[customer_name, setCustomer_name] = useState("");
    const[customer_email, setCustomer_email] = useState("");
    const customerHandler = (e) => {
        const selectedValue= e.target.value;
        if (selectedValue) {
            const [customerName, customerEmail] = selectedValue.split(',');
        
            console.log('Customer Name:', customerName);
            setCustomer_name(customerName);
            console.log('Customer Email:', customerEmail);
            setCustomer_email(customerEmail);
        
            
          } else {
            console.log('No customer selected.');
          }
        
        
    
    }


    //Bill id
    const[bill_id, setBill_id] = useState("");
    const bill_idHandler = (e) => {
        const timestamp = new Date().getTime().toString(36);
        const randomPortion = Math.random().toString(36).substr(2, 5); 
       

        setBill_id(`${timestamp}-${randomPortion}`);
        
    }
    useEffect(() => {
        bill_idHandler();
    }
    , [])

    //oncash cashon
    const[oncashClass, setonCashClass] = useState("oncash-deactive");
    const[cashonClass, setCashonClass] = useState("cashon-deactive");

    const[windowClass, setWindowClass] = useState("cashon-window-deactive");

    const oncashHandler = () => {
        setonCashClass("oncash-active");
        setCashonClass("cashon-deactive");
    
    }
    const cashonHandler = () => {
        setCashonClass("cashon-active");
        setonCashClass("oncash-deactive");

        setWindowClass("cashon-window-active");

        //show window
    
    }
    //payment date
    const[payment_date, setPayment_date] = useState("");
    const paymetdateHandler = (e) =>{
        setPayment_date(e.target.value);
    }
    const cashon_confirmHandler = () => {
        setWindowClass("cashon-window-deactive");
    }
    const cashon_cancelHandler = () => {
        setWindowClass("cashon-window-deactive");
        setCashonClass("cashon-deactive");
        setPayment_date('')
    }
//pay button
const payHandler= async()=>{
    const bill_data={
        bill_id:bill_id,
        customer_name:customer_name,
        customer_email:customer_email,
        date:new Date().toISOString().slice(0,10),
        payment_date:payment_date,
        total_amount:bill_items.reduce((acc, item) => acc + item.selling_price * item.item_qty, 0),
    }
    const billitem_data ={
        bill_items:bill_items,
    }
    console.log(bill_data);
    console.log(billitem_data);

    const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/bills`,{
        bill_data:bill_data,
        billitem_data:billitem_data,});

        console.log(res.data);
        if(res.data.status===200){
            alert("bill created successfully");
            setItems([]);
            setBill_id('');
            setCustomer_name('');
            setCustomer_email('');
            setBill_items([]);
            setPayment_date('');
        }else if(res.data.status===400){
            alert("something went wrong");
        }else if(res.data.status===500){
            alert("something went wrong");
        }
    }

  return (
  
<div className="parent">
    <div className={windowClass}>
    {/* <Cashon/> */}
    <div className='cashon-window'>
        <div className='close-window-sub'>
        {/* <div className='close-window'></div> */}
        <h1 className='cashon-window-title'>payment details</h1>
        <div className='cashon-details'>
        <div className='cashon-div'>
            <div className='cashon-details-div'>
                <label className='cashon-window-label-billno'>Bill No.</label>
                <p>{bill_id}</p>
            </div>
            <div className='cashon-details-div'>
                <label className='cashon-window-label-billno'>Customer Name</label>
                <p>{customer_name}</p>
            </div>
            <div className='cashon-details-div'>
                <label className='cashon-window-label-billno'>Bill Amount :</label>
                <p>{bill_items.reduce((acc, item) => acc + item.selling_price * item.item_qty, 0)}</p>
            </div>
            <div className='cashon-details-div'>
                <label className='cashon-window-label-billno'>E-mail:</label>
                <p>{customer_email}</p>
            </div>
            <div className='cashon-details-div'>
                <label className='cashon-window-label-billno'>Payment Date:</label>
                <input onChange={(e)=>paymetdateHandler(e)} value={payment_date} type='date'/>
            </div>
        </div>
        <div className='cashon-button-div'>
            <button className='cashon-button-confirm' onClick={cashon_confirmHandler}>confirm</button>
            <button className='cashon-button-cancel' onClick={cashon_cancelHandler}>cancel</button>
        </div>
        </div>
        </div>
        
        
    </div>
    </div>
    
    <div className="div1">
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
    <div className="div2">
        <div className='bill_summery_div'>
            <div className='customer_div'>
            <p>Customer  </p>

            <select className='pos_customer' onChange={customerHandler}>
             <option  value="">Select Customer</option>
                  {customers.map((customer) => (
              <option
                  value={`${customer.customer_name},${customer.customer_email}`}
                  key={customer.customer_name}
              >
              {customer.customer_name}
             </option>
              ))}
            </select>
            </div>
            <div className='bill_id_div'>
            <p>Bill Id  </p>
            <p>{bill_id}</p>
            </div>
            <div className='payment_method_div'>
                <p>Payment Method</p>
                <div>
                    <img className={oncashClass} onClick={oncashHandler} src={oncash} alt="" />
                    <p className='on_cash-pop-up'>on cash</p>
                    <img className={cashonClass} onClick={cashonHandler}  src={cashback} alt="" />
                    <p className='cash_on-pop-up'>cash on back</p>
                
                </div>
            </div>
            <div className='dot_line'></div>
            <div className='summery_total_div'>
                <p className='total_p' >Total </p>
                <p className='total'>
                    {bill_items.reduce((acc, item) => acc + item.selling_price * item.item_qty, 0)}
                </p>
            </div>
            
            <div className='button_div'>
                <button className='paybutton' onClick={payHandler}>Pay</button>
            </div>

        </div>

    
    </div>
    <div className="div3">
        <h1 className='catergory_h1'>catergory</h1>
        <div className='category_div'>
            
            {AllCatergory.map((item) => (
                <a onClick={selectcatergory(
                    item.catergory_name
                )}>
                    <Catergory 
                Catergory_name={item.catergory_name} 
                catergoryFile_name = {item.catergory_file}
                // Catergory_items={item.catergory_items} 
                />

                </a>
                

                ))}



        </div>
     
    </div>
    <div className="div4">
        <h1 className='items_h1'>Items</h1>
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
