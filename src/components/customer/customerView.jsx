import React from 'react'
import './customerView.css';
import Edit from './../icons/edit.png';

export default function CustomerView(props) {
  return (
    <div className='customerView'>
        <img src={Edit} alt="" onClick={props.edit} className='customerView-edit'/>
        <div className='customerView-div'>
        <label className='customerView-label'>Name: </label><p className='customer-view-props'>{props.name}</p>
        </div>
        <div className='customerView-div'>
        <label className='customerView-label'>Email: </label><p className='customer-view-props'> {props.email}</p>
        </div>
        <div className='customerView-div'>
        <label className='customerView-label'>Address: </label><p className='customer-view-props'> {props.address}</p>
        </div>
        <div className='customerView-div'>
        <label className='customerView-label'>ContactNo: </label><p className='customer-view-props'> {props.contactNo}</p>
        </div>
        <div className='customerView-div'>
        <label className='customerView-label'>NIC: </label><p className='customer-view-props'>{props.nic}</p>
        </div>
        
        
        



        
        
        
        
        

    </div>
  )
}
