import React from 'react';
import './customer.css';

export default function Customer() {
  return (
<div class="angry-grid">
  <div id="item-0">&nbsp;</div>
  <div id="item-1">
    <h1>Add Customer</h1>
    <div>
        <label>Customer name:</label>
        <input type="text" />
    </div>
    <div>
        <label>Customer Address:</label>
        <input type="text" />
    </div>
    <div>
        <label>Customer email:</label>
        <input type="text" />
    </div>
    <div>
        <label>Customer contact no:</label>
        <input type="text" />
    </div>
    <div>
        <label>Customer NIC:</label>
        <input type="text" />
    </div>
    
  </div>
</div>
    
  )
}
