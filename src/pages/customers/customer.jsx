import React, { useState, useEffect } from 'react';
import './customer.css';
import Axios from 'axios';
import CustomerView from '../../components/customer/customerView';

export default function Customer() {
  const[buttonset,setButtonset]=useState('customer-view-update-delete-deactive')
  const[addbutton,setAddbutton]=useState('customer-view-add-button-active')

  const[customerData,setCustomerData]=useState({
    CustomerId:'',
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
    const res =await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/customers`,customerData)
    if(res.status === 200){alert("Customer added successfully")}
  } catch (error) {
    if(error.response.status === 500){alert("Internal Server Error")}
    else if(error.response.status === 400){ alert("please fill customer name")}

  }

}


//get all customers
const[customers,setCustomers]=useState([])
const getAllCustomers=async()=>{
  const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers`)
  console.log(res.data);
  setCustomers(res.data)
}
useEffect(()=>{
  getAllCustomers()
}

,[])
  

//edite
const EditeHandler=(id,name,address,email,contactNo,nic)=>(e)=>{
  console.log(id,name,address,email,contactNo,nic)
  setCustomerData({
    CustomerId:id,
    CustomerName:name,
    CustomerAddress:address,
    CustomerEmail:email,
    CustomerContactNo:contactNo,
    CustomerNIC:nic
    
  }
    )
    setButtonset('customer-view-update-delete-active')
    setAddbutton('customer-view-add-button-deactive')



}

//update
const updateCustomer=async()=>{
  const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/customers`, customerData)
  if(res.status === 200){alert("Customer updated successfully")}
  else if(res.status === 400){alert("error")}
}

//delete
const deleteCustomer=async()=>{
  const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/customers/?id=${customerData.CustomerId}`)
  console.log(res.data);
  if(res.status === 200){alert("Customer deleted successfully")
  setCustomerData({
    CustomerId:'',
    CustomerName:'',
    CustomerAddress:'',
    CustomerEmail:'',
    CustomerContactNo:'',
    CustomerNIC:''
  }
    )
    setButtonset('customer-view-update-delete-deactive')
    setAddbutton('customer-view-add-button-active')
  }
  else if(res.status === 400){alert("error")}
}

  return (
<div class="angry-grid">
  <div id="item-0">
    <h1 className='customer-header'>Customers</h1>
    <div className='serchbar-container'>
     <input type='text' className='customer-view-searchbar' placeholder='Search Customer' />
    </div>
    
    <div className='customer-view'>
      
      
      {customers.map((customer)=>{
        return(
          <CustomerView
           name={customer.customer_name}
            address={customer.customer_address}
             email={customer.customer_email}
              contactNo={customer.customer_contact_no}
               nic={customer.customer_NIC}
                edit={EditeHandler(
                  customer.customer_id,customer.customer_name,
                  customer.customer_address,
                  customer.customer_email,
                  customer.customer_contact_no,
                  customer.customer_NIC)}
               
                />
        )
      
      }
      )}
    </div>
  </div>
  <div id="item-1">
    <h1 className='customer-add-header'>Add Customer</h1>
    <div className='customer-add-div'>
    <div className='customer-view-input-div'>
        <label className='customer-add-input-label'>Customer Name:</label>
        <input className='customer-add-input' id='CustomerName' value={customerData.CustomerName} onChange={(e)=>HandleCustomerData(e)} type="text" />
    </div>
    <div className='customer-view-input-div'>
        <label className='customer-add-input-label'>Customer Address:</label>
        <input className='customer-add-input'  id='CustomerAddress' value={customerData.CustomerAddress} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div className='customer-view-input-div'>
        <label className='customer-add-input-label'>Customer Email:</label>
        <input className='customer-add-input'  id='CustomerEmail' value={customerData.CustomerEmail} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div className='customer-view-input-div'>
        <label className='customer-add-input-label'>Customer Contact No:</label>
        <input className='customer-add-input'  id='CustomerContactNo' value={customerData.CustomerContactNo} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <div className='customer-view-input-div'>
        <label className='customer-add-input-label'>Customer NIC:</label>
        <input className='customer-add-input'  id='CustomerNIC' value={customerData.CustomerNIC} onChange={(e)=>HandleCustomerData(e)}  type="text" />
    </div>
    <button className={addbutton} onClick={addCustomer}>Add</button>
    
    </div>
    <div className={buttonset}>
      <button className='customer-view-update-button' onClick={updateCustomer}>update</button>
      
      <button className='customer-view-delete-button'  onClick={deleteCustomer}>delete</button>
    </div>
    
    
    
    
  </div>
</div>
    
  )
}
