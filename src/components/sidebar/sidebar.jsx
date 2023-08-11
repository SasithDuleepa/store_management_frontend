import React, { useState } from 'react'
import './sidebar.css'

export default function Sidebar() {
 
  return (
    <div className='sidebar'>
        <div className='sidebar_item_company'>
            <p className='sidebar_company_text'>company</p>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link' href='/sale'>Sale</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>
        <div className='sidebar_item'>
            <div class="nav_link_dropdown">
                <p className='sidebar-setting'>Setting</p>

                <div class="nav_link_dropdown_list"> 

                <ul className='setting_dropdown_list'>
                    <li><a className='setting_dropdown_list_item'  href='/catergory'>catergory</a></li>
                    <li><a className='setting_dropdown_list_item'   href='#'>Items</a></li>
                    <li><a className='setting_dropdown_list_item'   href='#'>Users</a></li>
                    
                </ul>

                 </div>
            </div>
          
        </div>
        <div className='sidebar_item'>
            <a className='nav_link'>navlink</a>
        </div>

        <div className='sidebr_bottom'>
            <p className='sidebar_bottom_text'>user</p>
        </div>
        

    </div>
  )
}
