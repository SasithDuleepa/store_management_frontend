import React from 'react';
import './dashboad_card.css';


export default function Dashboad_card(props) {
  return (
    <div className='card-main-div'>
        <p className='card-title'>{props.title}</p>
        <div className='card-preview-div'>
            <img className='card-img' src={props.image} alt="" />
            <p className='card-value'>{props.value}</p>
        </div>
    </div>
  )
}
