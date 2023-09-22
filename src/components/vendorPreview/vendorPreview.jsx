import React from 'react';
import './vendorPreview.css';
import Edite from './../../components/icons/edit.png'

export default function VendorPreview(props) {
  return (
    <div className='vendorPreview-main-div'>
        <img className='vendorPreview-edite-img' src={Edite} alt="edit" />
        <div className='vendorPreview-div'>
            <label className='vendorPreview-label'> Name :</label>
            <p className='vendorPreview-props'>{props.name}</p>
        </div>
        <div className='vendorPreview-div'>
            <label className='vendorPreview-label'> Address :</label>
            <p className='vendorPreview-props'>{props.address}</p>
        </div>
        <div className='vendorPreview-div'>
            <label className='vendorPreview-label'> Email :</label>
            <p className='vendorPreview-props'>{props.email}</p>
        </div>
        <div className='vendorPreview-div'>
            <label className='vendorPreview-label'> Contact no. :</label>
            <p className='vendorPreview-props'>{props.ContactNo}</p>
        </div>
        <div className='vendorPreview-div'>
            <label className='vendorPreview-label'> NIC :</label>
            <p className='vendorPreview-props'>{props.nic}</p>
        </div>

    </div>
  )
}
