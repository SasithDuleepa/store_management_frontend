import React from 'react'
import './customerView.css';
import Edit from './../icons/edit.png';

export default function CustomerView(props) {
  return (
    <div className='customerView'>
        <img src={Edit} alt="" className='customerView-edit'/>
        
        <label className='customerView-label'>Name: <p className='customer-view-props'>{props.name}</p></label>
        <label className='customerView-label'>Email: <p className='customer-view-props'> {props.email}</p></label>
        <label className='customerView-label'>Address: <p className='customer-view-props'> {props.address}</p></label>
        <label className='customerView-label'>ContactNo: <p className='customer-view-props'> {props.contactNo}</p></label>
        <label className='customerView-label'>NIC: <p className='customer-view-props'>{props.nic}</p></label>
        
        
        
        
        

    </div>
  )
}
