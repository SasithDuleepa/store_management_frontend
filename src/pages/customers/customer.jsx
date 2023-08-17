import React, { useState, useEffect } from 'react';
import './customer.css';
import Axios from 'axios';
import CustomerView from '../../components/customer/customerView';

export default function Customer() {
  const[customerData,setCustomerData]=useState({
    CustomerName:'',
    CustomerAddress:'',
    CustomerEmail:'',
    CustomerContactNo:'',
    CustomerNIC:''
  });

  const HandleCustomerData=(e)=>{
    setCustomerData({...customerData,[e.target.id]:e.target.value})
    // console.log(customerData);
  
  }
//add
const addCustomer=async()=>{
  try {
    const res =await Axios.post('http://localhost:8080/customers',customerData)
    if(res.status === 200){alert("Customer added successfully")}
  } catch (error) {
    if(error.response.status === 500){alert("Internal Server Error")}
    else if(error.response.status === 400){ alert("please fill customer name")}

  }

}


//get all customers
const[customers,setCustomers]=useState([])
const getAllCustomers=async()=>{
  const res = await Axios.get('http://localhost:8080/customers')
  console.log(res.data);
  setCustomers(res.data)
}
useEffect(()=>{
  getAllCustomers()
}

,[])
  

  return (
<div class="angry-grid">
  <div id="item-0">
    <div className='serchbar-container'>
     <input type='text' className='customer-view-searchbar' placeholder='Search Customer' />
    </div>
    
    <div className='customer-view'>
      <CustomerView name='xxaaaa aaaaaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaa' address='xx' email='xx' contactNo='xx' nic='xx' />
      {customers.map((customer)=>{
        return(
          <CustomerView
           name={customer.customer_name}
            address={customer.customer_address}
             email={customer.customer_email}
              contactNo={customer.customer_contact_no}
               nic={customer.customer_NIC
               }
                />
        )
      
      }
      )}
    </div>
  </div>
  <div id="item-1">
    <h1>Add Customer</h1>
    <div>
        <label>Customer name:</label>
        <input id='CustomerName' value={customerData.CustomerName} onChange={(e)=>HandleCustomerData(e)} type="text" />
    </div>
    <div>
        <label>Customer Address:</label>
        <input id='CustomerAddress' value={customerData.CustomerAddress} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div>
        <label>Customer email:</label>
        <input id='CustomerEmail' value={customerData.CustomerEmail} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div>
        <label>Customer contact no:</label>
        <input id='CustomerContactNo' value={customerData.CustomerContactNo} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div>
        <label>Customer NIC:</label>
        <input id='CustomerNIC' value={customerData.CustomerNIC} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <button onClick={addCustomer}>Add</button>
    
  </div>
</div>
    
  )
}
