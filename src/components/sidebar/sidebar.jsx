import React, { useState } from 'react'
import './sidebar.css'

export default function Sidebar() {
    const[user,SetUser] = useState(localStorage.getItem('user') || 'user')
 
  return (
    <div className='sidebar'>
        <div className='sidebar_item_company'>
            <p className='sidebar_company_text'>company</p>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/sale'>Sale</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/customer'>Customers</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/stock'>Stock</a>
        </div>
        {/* <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div> */}
        <div className='sidebar_item'>
            <div className="nav_link_dropdown">
                <p className='sidebar-setting'>Setting</p>

                <div className="nav_link_dropdown_list"> 

                <ul className='setting_dropdown_list'>
                    <li><a className='setting_dropdown_list_item'  href='/setting/catergory'>Catergory</a></li>
                    <li><a className='setting_dropdown_list_item'   href='/setting/items'>Items</a></li>
                    <li><a className='setting_dropdown_list_item'   href='/setting/users'>Users</a></li>
                    
                </ul>

                 </div>
            </div>
          
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/return'>Return</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/email'>Email</a>
        </div>

        <div className='sidebr_bottom'>
            <a href='/' className='sidebar_bottom_text'>{user}</a>
        </div>
        

    </div>
  )
}
