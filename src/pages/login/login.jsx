import React, { useState } from 'react';
import Axios from 'axios';
import Pos from './../../components/icons/pos.jpg';

import './login.css';
import { useEffect } from 'react';

export default function Login() {
  

  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const LoginHandler = async () => {
    window.location = '/sale';


    // const res = await Axios.post('http://localhost:8080/login', data);
    // console.log(res.data);

    // if (res.data.status === 200) {
    //   console.log(res.data);
    //   localStorage.setItem('token', res.data.token);
    //   localStorage.setItem('role', res.data.user_role);
    //   localStorage.setItem('user', res.data.user);
    //   window.location = '/sale';
    
    // } else if(res.data.status === 400) {
    //   console.log('Login failed');
    //   alert('Login failed');
    // }
  };
//check login status
  useEffect(() => {
    if(localStorage.getItem('token')){
      setLogoutbtn('logout-btn-active')
    }
    
  },[])
  //logout
  const[logoutbtn,setLogoutbtn] = useState('logout-btn-deactive')
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  }

  return (
    <div className='login-parent-div'>
      <div className='login-child-input'>
      
      <div className='login-div'>
      <h1 className='login-header'>Log in</h1>
        <div className='log-in-name-div'>
          <label className='login-name-label'>name</label>
          <input
            id="name"
            value={data.name}
            onChange={(e) => handleChange(e)}
            type="text"
          />
        </div>
        <div  className='log-in-password-div'>
          <label className='login-password-label'>password</label>
          <input
            id="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
            type="password"
          />
        </div>
        <div className='btn_div'>
        <button className='login_btn' onClick={LoginHandler}>login</button>
        </div>

        

      </div>
      
      {/* <button className={logoutbtn} onClick={logoutHandler}>logout</button> */}
      </div>
      



  <svg width="100%" height="100%">
    <defs>
      <pattern id="polka-dots" x="0" y="0"                    width="100" height="100"
               patternUnits="userSpaceOnUse">
 
      </pattern>  
        <style>
     @import url("https://fonts.googleapis.com/css?  family=Lora:400,400i,700,700i");
   </style>
      
    </defs>
              
    <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"> </rect>
     
    
   
 <text x="50%" y="40%"  text-anchor="middle"  >
   Company 
 </text>
 <text x="50%" y="65%"  text-anchor="middle"  >
   Name
 </text>
 </svg>




    </div>
    
  );
}
