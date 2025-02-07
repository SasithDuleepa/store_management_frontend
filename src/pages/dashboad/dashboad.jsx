
import './dashboad.css';
import Axios from 'axios';
import Dashboad_card from '../../components/dashboad_card/dashboad_card';

import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useEffect } from 'react';
import { useState } from 'react';

import Items from './../../components/icons/items.png'
import Customers_ from './../../components/icons/customers.png'



//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Dashboad() {
  //get availble stock
  const [stock,setStock] = useState([])
  const GetStock = async()=>{
    const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/stock`);
    console.log(res.data);
    setStock(res.data);
  }
// useEffect(()=>{GetStock()},[])



const dataPoints = stock.map((item) => ({
  label: item.item_name,
  y: item.available_qty,
}));
CanvasJS.addColorSet("customColorSet", [
  "#4CAF50", // Green
  "#FFC107", // Amber
  "#2196F3", // Blue
  "#FF5722", // Deep Orange
  "#9C27B0", // Purple
]);

const options = {
  animationEnabled: true, 
	animationDuration: 2000,
  theme: "dark2",    // "light1", "dark1", "dark2"
  backgroundColor: "#333",
  colorSet: "customColorSet",
  title: {
    text: "Available Stock",
    fontColor: "white",
  },
  axisX: {
    // title: "X-Axis Label",
    titleFontColor: "white", // Text color of the X-axis title.
    labelFontColor: "white", // Text color of X-axis labels.
    lineColor: "white", // Color of X-axis lines.
    tickColor: "white", // Color of X-axis ticks (grid lines).
    // gridColor: "transparent",
  },
  axisY: {
    // title: "Y-Axis Label",
    titleFontColor: "white", // Text color of the Y-axis title.
    labelFontColor: "white", // Text color of Y-axis labels.
    lineColor: "white", // Color of Y-axis lines.
    tickColor: "white", // Color of Y-axis ticks (grid lines).
    gridColor: "transparent",
  },
  data: [
    {
      type: "column",
      dataPoints: dataPoints,
    },
  ],
};


//get suppliers
const[Suppliers,setSuppliers] = useState([])
const GetSuppliers = async()=>{
  const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/all`)
  console.log(res.data);
  setSuppliers(res.data);
}
//get customers
const[Customers,setCustomers] = useState([])
const GetCustomers = async()=>{
  const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers`)
  console.log(res.data);
  setCustomers(res.data);
}

useEffect(()=>{GetStock() ; GetSuppliers(); GetCustomers()},[])
  return (
    <div>
      <h1 className='dashboad-view-h1'>Dashboad</h1>
      <div className='dashboad-summery-view-div'>
        <Dashboad_card title='Total Items' image={Items} value='400'/>
        <Dashboad_card title='Total Customers' image={Customers_} value='400'/>
        <Dashboad_card title='Total Suppliers' image={Items} value='400'/>
        <Dashboad_card title='Today Sale' image={Items} value='400'/>

      </div>
      <div>
        <div>
        <div className='dashboad-available-stock-graph-div'>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
    <div className='dashboad-div-2'>
    <div className='dashboad-suppliers-div'>
    <div className='dashboad-suppliers-heder-div'>
          <p className='dashboad-suppliers-name'><b>Supplier</b></p>
          <p className='dashboad-suppliers-email'><b>Email</b></p>
          <p className='dashboad-suppliers-address'><b>Address</b></p>
        </div>
      {Suppliers.map((item) => (
        
        <div className='dashboad-suppliers-details-div'>
          <p className='dashboad-suppliers-name'>{item.vendor_name}</p>
          <p className='dashboad-suppliers-email'>{item.vendor_email}</p>
          <p className='dashboad-suppliers-address'>{item.vendor_address}</p>
        </div>
      ))
        }

    </div>

    <div  className='dashboad-customers-div'>
    <div className='dashboad-customers-heder-div'>
          <p className='dashboad-customers-name'><b>Customer</b></p>
          <p className='dashboad-customers-email'><b>Email</b></p>
          <p className='dashboad-customers-address'><b>Address</b></p>
        </div>
      {Customers.map((item) => (
        
        <div className='dashboad-customers-details-div'>
          <p className='dashboad-customers-name'>{item.customer_name}</p>
          <p className='dashboad-customers-email'>{item.customer_email}</p>
          <p className='dashboad-customers-address'>{item.customer_address}</p>
        </div>
      ))
        }
    </div>

    </div>
    

        </div>
      </div>
    </div>
  )
}
