import React, { useState } from 'react';
import './vendors.css';
import Axios from 'axios';

import VendorPreview from '../../components/vendorPreview/vendorPreview';
import { useEffect } from 'react';

export default function Vendors() {
    const[data, setData] = useState({
        Name:'',
        address:'',
        email:'',
        ContactNo:'',
        nic:''
    })

    const handleChange = (e)=>{
        setData({...data,
            [e.target.id]:e.target.value})
    
    }

    //add button
    const addhandler =async ()=>{
        console.log(data);
        const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor/add`,data)
        console.log(res.data);
        if(res.data.status === 200){
            alert("successfully added")
        
        }else if(res.data.status === 400){
            alert("error")
        }else if(res.data.status === 500){
            alert("Internal Server Error")
        }
    }

    //get all vendors
    const [vendors, setVendors] = useState([])

    const getallvendors = async ()=>{
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/all`)
        console.log(res.data);
        
            setVendors(res.data)
        
       
    
    }

    useEffect(()=>{
        getallvendors()
    
    },[])
  return (
    <div className='vendors-parent-div'>
        <div className='vendors-child-div-1'>
            <h1 className='vendors-view-header'>Vendors</h1>
            <div className='vendors-view'>
                
                {vendors.map((vendor)=>{
                    return(
                        
                    <VendorPreview name={vendor.vendor_name}
                     address={vendor.vendor_address}
                     email={vendor.vendor_email}
                      ContactNo={vendor.vendor_contact_no}
                       nic={vendor.vendor_nic}  />)
                }
                )}
            </div>
        </div>
        <div className='vendors-child-div-2'>
            <h1 className='vendors-add-header'>add vendors</h1>
            <div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Vendor Name:</label>
                    <input className='vendors-add-input' id='Name' type="text" onChange={(e)=>handleChange(e)} value={data.Name}  /> 
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Vendor Address:</label>
                    <input className='vendors-add-input' id='address' type="text" onChange={(e)=>handleChange(e)} value={data.address}   />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Vendor Email:</label>
                    <input className='vendors-add-input' id='email' type="text" onChange={(e)=>handleChange(e)} value={data.email}   />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Vendor Contact No:</label>
                    <input className='vendors-add-input' id='ContactNo' type="text" onChange={(e)=>handleChange(e)} value={data.ContactNo}    />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Vendor NIC No:</label>
                    <input className='vendors-add-input' id='nic' type="text"  onChange={(e)=>handleChange(e)} value={data.nic}   />
                </div>
                <button className='vendors-view-add-button' onClick={addhandler}>Add</button>
            </div>
        </div>
    </div>
  )
}
