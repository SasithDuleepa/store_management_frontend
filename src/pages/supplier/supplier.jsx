import React, { useState } from 'react';
import './supplier.css';
import Axios from 'axios';

import SupplierPreview from '../../components/supplierPreview/supplierPreview';
import { useEffect } from 'react';

export default function Supplier() {
    const[btn, setBtn] = useState('vendor-edite-btn-div-deactive');
    const[addbtn, setAddbtn] = useState('vendor-add-btn-active');
    const[data, setData] = useState({
        id:'',
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

    //Edite
    const EditeHandler= (id,name,address,email,contactNo,nic)=>(e) =>{

        console.log(id,name,address,email,contactNo,nic)
        setData({
            id:id,
            Name:name,
            address:address,
            email:email,
            ContactNo:contactNo,
            nic:nic
        })
        setBtn('vendor-edite-btn-div-active');
        setAddbtn('vendor-add-btn-deactive');
    }

    //update 
    const updatehandler = async ()=>{
        console.log(data);
        const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/vendor/update`,data)
    }
  return (
    <div className='vendors-parent-div'>
        <div className='vendors-child-div-1'>
            <h1 className='vendors-view-header'>Suppliers</h1>
            <div className='vendors-view'>
                
                {vendors.map((vendor)=>{
                    return(
                        
                    <SupplierPreview name={vendor.vendor_name}
                     address={vendor.vendor_address}
                     email={vendor.vendor_email}
                      ContactNo={vendor.vendor_contact_no}
                       nic={vendor.vendor_nic}
                       editehandler={EditeHandler(
                        vendor.vendor_id,
                        vendor.vendor_name,
                        vendor.vendor_address,
                        vendor.vendor_email,
                        vendor.vendor_contact_no,
                        vendor.vendor_nic

                        )} />)
                }
                )}
            </div>
        </div>
        <div className='vendors-child-div-2'>
            <h1 className='vendors-add-header'>Add Supplier</h1>
            <div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Supplier Name:</label>
                    <input className='vendors-add-input' id='Name' type="text" onChange={(e)=>handleChange(e)} value={data.Name}  /> 
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Supplier Address:</label>
                    <input className='vendors-add-input' id='address' type="text" onChange={(e)=>handleChange(e)} value={data.address}   />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Supplier Email:</label>
                    <input className='vendors-add-input' id='email' type="text" onChange={(e)=>handleChange(e)} value={data.email}   />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Supplier Contact No:</label>
                    <input className='vendors-add-input' id='ContactNo' type="text" onChange={(e)=>handleChange(e)} value={data.ContactNo}    />
                </div>
                <div className='vendors-view-input-div'>
                    <label className='vendors-add-input-label'>Supplier NIC No:</label>
                    <input className='vendors-add-input' id='nic' type="text"  onChange={(e)=>handleChange(e)} value={data.nic}   />
                </div>
                <button className={addbtn} onClick={addhandler}>Add</button>
                <div className={btn}>
                    <button className='vendor-update-btn' onClick={updatehandler}>update</button>
                    <button className='vendor-delete-btn'>delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
