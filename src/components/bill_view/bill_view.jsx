import React from 'react'
import './bill_view.css';

export default function Bill_view(props) {
  return (
    <div className='bill-view-div'>
        <p className='bill-view-billId'>{props.billId}</p>
        <p className='bill-view-billDate'>{props.date}</p>
        <p className='bill-view-amount'>{props.amount}</p>
        <p className='bill-view-customer'>{props.customer}</p>
    </div>
  )
}
