import React from 'react';
import './users.css';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Users() {
    const [userData, setUserData] = React.useState(
        {
            user_name: '',
            user_role: '',
            user_role: '',
            user_email: '',
            user_password: ''
        }
    )
    const handleUserData = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
//add user
const addUser = async () => {
    const res = await Axios.post('http://localhost:8080/user', userData)
    console.log(res.data)
    
}
//get user roles
const[userRoles, setUserRoles] = useState([])
const getUserRoles = async () => {
    const res = await Axios.get('http://localhost:8080/user_role')
    setUserRoles(res.data)
    console.log(res.data)
}
useEffect(()=>{
    getUserRoles()
}
    ,[])
    
  return (
    <div className='users-parent-div'>
        <div className='users-child-div-1'></div>
        <div className='users-child-div-2'>
            <h1>add user</h1>
            <div className='users-form-div'>
                <div className='users-form-input-div'>
                    <label>name</label>
                    <input id='user_name' value={userData.user_name} onChange={(e)=>handleUserData(e)} type="text" />
                </div>
                <div className='users-form-input-div'>
                    <label>user role</label>
                    <select id='user_role' value={userData.user_role} onChange={(e)=>handleUserData(e)}>
                        <option>select user role</option>
                        {userRoles.map((role)=>(
                            <option value={role.user_role}>{role.user_role}</option>
                        ))}
                    </select>
                </div>
                <div className='users-form-input-div'>
                    <label>email</label>
                    <input id='user_email' value={userData.user_email} onChange={(e)=>handleUserData(e)} type="text" />
                </div>
                <div className='users-form-input-div'>
                    <label>password</label>
                    <input id='user_password' value={userData.user_password} onChange={(e)=>handleUserData(e)} type="text" />
                </div>
                
            </div>
            <div>
                <button onClick={addUser}>add user</button>
            </div>
        </div>
    </div>
  )
}
