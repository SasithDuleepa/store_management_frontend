import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import './stock.css';
import Axios from 'axios';
import StockItems from '../../components/stock_items/stockItems';
import axios from 'axios';

export default function Stock() {
    const[buttondiv,setButtondiv]= useState('stock-update-delete-deactive')
    const[addbutton,setAddbutton] = useState('stock-add-button-active')

    const[available,setAvailable]= useState('stock-available-deactive')

    const[data, setData] = React.useState({
        id:"",
        catergory:"",
        item_name:"",
        stock_qty:"",
        taking_price:"",
        selling_price:"",
        batch_no:"",
        exp_date:"",
        location:"",
        available_qty:"",
        supplier_id:'',
        date:""
    
    });
    const changeHandler = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    
    }
//get vendors
const supplierOptions = [];
const [supplierSelectedOption, setSupplierSelectedOption] = useState(null);

const GetSuppliers = async(selected) =>{
console.log(selected)
setData({...data, supplier:selected.value})
}
const SupplierSelect = async(e) =>{
    console.log(e)
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/search/${e}`)
console.log(res)
const option = res.data.map((name)=>({
    value: name.vendor_id,
    label:name.vendor_name
}))
return option;
}


const[vendors, setVendors] = React.useState([]);
const GetVendors =async () => {
    const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/all`);
    console.log(res.data);
    const Data = res.data;
    setVendors(res.data);

    // eslint-disable-next-line array-callback-return
    Data.map((vendor)=>{
        supplierOptions.push({value:vendor.vendor_id, label:vendor.vendor_name})
    })

}




const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];





    //get catergories
    const[catergories, setCatergories] = React.useState([]);
    const getCatergories = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
        console.log(res.data);
        setCatergories(res.data);
    }
    useEffect(() => {
        getCatergories();
        GetVendors();
    }
    , [])

    //get items according to catergory
    const[items, setItems] = React.useState([]);
    const getItems = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/accToCatergory/?catergory_id=${data.catergory}`);
        console.log(res.data);
        setItems(res.data);
    
    }
    useEffect(() => {
        getItems();
    }
    , [data.catergory])

  

    //add
    const addHandler =async () => {
        const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/stock`,data)
        console.log(res.data)
        if(res.status===200){alert("Stock added successfully");
        getStockItems()
           }
        



    }


    //get all stockitems
    const[stockItems, setStockItems] = React.useState([]);
    const getStockItems = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/stock`);
        console.log(res.data);
        setStockItems(res.data);
    }
    useEffect(() => {
        getStockItems();
    }
    , [])

    //edite
    const editeFunction = (id,itemname,catergory,stock_qty,taking_price,selling_price,batch_no,exp_date,location,available,vendor,date )=> (e)=> {

       console.log(id,itemname,catergory,stock_qty,taking_price,selling_price,batch_no,exp_date,location);
       setData({
        id:id,
        catergory:catergory,
        item_name:itemname,
        stock_qty:stock_qty,
        taking_price:taking_price,
        selling_price:selling_price,
        batch_no:batch_no,
        exp_date:exp_date,
        location:location,
        available_qty:available,
        supplier:vendor,
        date:date
       })
       setAddbutton('stock-add-button-deactive')
       setButtondiv('stock-update-delete-active')
       setAvailable('stock-available-active')
 


    }

    //update
   const updateHandler = async () => {
       const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/stock`,data)
       console.log(res.data)
       if(res.status===200){alert("Stock updated successfully");}
       else if(res.status===400){alert("Stock update failed");}
       getStockItems()
   }
   

   //delete 
   const deleteHandler = async () => {
    const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/stock/?id=${data.id}`)
    console.log(res.data)
    if(res.status===200){alert("Stock deleted successfully")
    getStockItems();}
    else if(res.status===400){alert("Stock delete failed");}

}

//search function
const searchHandler = async (e) => {
    const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/stock/search/?item_name=${e.target.value}`);
    console.log(res.data);
    setStockItems(res.data);

}
  return (
    <div>
        
        <div class="stock-parent">
<div class="stock-div1">
    
    <h1 className='stock-view-title'>Stock</h1>
    <div>
        <div className='stockitem-search-div'>
        <input className='stockitem-searchbar' onChange={(e)=>searchHandler(e)} type="text" id='search' placeholder='Item name'/>
        </div>
        <div className='stockitem-subdiv'>
          
             
             {stockItems.map((item) => (
                    <StockItems
                    itemName={item.item_name}
                    catergory={item.catergory}
                    stock_qty={item.stock_qty}
                    taking_price={item.taking_price}
                    selling_price={item.selling_price}
                    batch_no={item.batch_no}
                    exp_date={item.expire_date}
                    location={item.location}
                    available={item.available_qty}
                    supplier={item.vendor}
                    date={item.date}
                    editeFunction={editeFunction(
                        item.stock_id,
                        item.item_name,
                        item.catergory,
                        item.stock_qty,
                        item.taking_price,
                        item.selling_price,
                        item.batch_no,
                        item.expire_date,
                        item.location,
                        item.available_qty,
                        item.vendor,
                        item.date
                    
                    )}

                    />

                    
                ))}
             

        </div>
        
    </div>
</div>

<div class="stock-div3"> 
        <h1 className='stock-add-title'>Add to Stock</h1>

        <div className='stock-input-div'>
            <label className='stock-input-label'>Supplier Name:</label>
            {/* <input className='stock-input'  type="text" id='supplier' onChange={(e)=>changeHandler(e)} value={data.supplier}  /> */}
            <AsyncSelect
        value={supplierSelectedOption}
        onChange={GetSuppliers}
        loadOptions={SupplierSelect}
        // options={options}
      />

        </div>

        <div className='stock-input-div'>
            <label className='stock-input-label'>Date:</label>
            <input className='stock-input'  type="date" id='date' onChange={(e)=>changeHandler(e)} value={data.date}  />
        </div>


        <div  className='stock-input-div'>
            <label className='stock-input-label'>Catergory:</label>
            {/* <input type="text" id='catergory' onChange={(e)=>changeHandler(e)} value={data.catergory}/> */}
            <select  className='stock-input'  id='catergory' onChange={(e)=>changeHandler(e)}>
                <option value="">select category</option>
                {catergories.map((item) => (
                    <option value={item.catergory_name}>{item.catergory_name}</option>
                ))}
            </select>
        </div>
        <div  className='stock-input-div'>
            <label className='stock-input-label'>Item Name :</label>
            {/* 
            <input type="text" id='item_name' onChange={(e)=>changeHandler(e)} value={data.item_name}/>  */}
            <select  className='stock-input'  id='item_name' onChange={(e)=>changeHandler(e)}>
                <option value="">select Item</option>
                {items.map((item) => (
                    <option value={item.item_name}>{item.item_name}</option>
                ))}
            </select>
        </div>
        <div className='stock-input-div'>
            <label className='stock-input-label'>Stock Qty:</label>
            <input className='stock-input'  type="text" id='stock_qty' onChange={(e)=>changeHandler(e)} value={data.stock_qty}   />
        </div>
        <div className='stock-input-div'>
            <label className='stock-input-label'>Taking Price:</label>
            <input className='stock-input' type="text" id='taking_price' onChange={(e)=>changeHandler(e)} value={data.taking_price}   />
        </div>
        <div  className='stock-input-div'>
            <label className='stock-input-label'>Selling Price:</label>
            <input className='stock-input'  type="text" id='selling_price' onChange={(e)=>changeHandler(e)} value={data.selling_price}    />
        </div>
        <div  className='stock-input-div'>
            <label className='stock-input-label'>Batch No.:</label>
            <input className='stock-input'  type="text" id='batch_no' onChange={(e)=>changeHandler(e)} value={data.batch_no}   />
        </div>
        <div className='stock-input-div'>
            <label className='stock-input-label'>Exp. Date:</label>
            <input className='stock-input'  type="text" id='exp_date' onChange={(e)=>changeHandler(e)} value={data.exp_date}    />
        </div>
        <div className='stock-input-div'>
            <label className='stock-input-label'>Location:</label>
            <input className='stock-input'  type="text"   id='location' onChange={(e)=>changeHandler(e)} value={data.location}    />
        </div>
        <div className={available}>
            <label className='stock-input-label'>Available Qty:</label>
            <input className='stock-input'  type="text"   id='available_qty' onChange={(e)=>changeHandler(e)} value={data.available_qty}    />
        </div>
        <button className={addbutton} onClick={addHandler}>Add</button>
        <div className={buttondiv}>
            <button onClick={updateHandler} className='stock-updatebutton'>Update</button>
            <button onClick={deleteHandler} className='stock-deletebutton'>Delete</button>
        </div>
</div>
</div>
    </div>
  )
}
