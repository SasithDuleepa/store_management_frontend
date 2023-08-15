import React, { useEffect } from 'react';
import './stock.css';
import Axios from 'axios';
import StockItems from '../../components/stock_items/stockItems';

export default function Stock() {
    const[data, setData] = React.useState({
        catergory:"",
        item_name:"",
        stock_qty:"",
        taking_price:"",
        selling_price:"",
        batch_no:"",
        exp_date:"",
        location:""
    
    });
    const changeHandler = (e) => {
        setData({...data, [e.target.id]: e.target.value})
        
    
    }

    //get catergories
    const[catergories, setCatergories] = React.useState([]);
    const getCatergories = async () => {
        const res = await Axios.get("http://localhost:8080");
        console.log(res.data);
        setCatergories(res.data);
    }
    useEffect(() => {
        getCatergories();
    }
    , [])

    //get items according to catergory
    const[items, setItems] = React.useState([]);
    const getItems = async () => {
        const res = await Axios.get(`http://localhost:8080/items/accToCatergory/?catergory=${data.catergory}`);
        console.log(res.data);
        setItems(res.data);
    
    }
    useEffect(() => {
        getItems();
    }
    , [data.catergory])

  

    //add
    const addHandler =async () => {
        const res = await Axios.post('http://localhost:8080/stock',data)
        console.log(res.data)
    }


    //get all stockitems
    const[stockItems, setStockItems] = React.useState([]);
    const getStockItems = async () => {
        const res = await Axios.get('http://localhost:8080/stock');
        console.log(res.data);
        setStockItems(res.data);
    }
    useEffect(() => {
        getStockItems();
    }
    , [])

    //edite
    const editeFunction = (itemname,catergory,stock_qty,taking_price,selling_price,batch_no,exp_date,location) => (e)=> {

       console.log(itemname,catergory,stock_qty,taking_price,selling_price,batch_no,exp_date,location);
 


    }
  return (
    <div>
        
        <div class="stock-parent">
<div class="stock-div1">
    <h1 className='stock-view-title'>Stock</h1>
    <div>
        <div>
        <input type="text" id='search' placeholder='search'/>
        </div>
        <div className='stockitem-subdiv'>
            {/* <StockItems
             itemName='jj'
             catergory='jj'
             stock_qty='jj'
             taking_price='jj'
             selling_price='jj'
             batch_no='jj'
             exp_date='jj'
             location='jj'/> */}
             
             {stockItems.map((item) => (
                    <StockItems
                    itemName={item.item_id}
                    catergory={item.catergory}
                    stock_qty={item.stock_qty}
                    taking_price={item.taking_price}
                    selling_price={item.selling_price}
                    batch_no={item.batch_no}
                    exp_date={item.expire_date}
                    location={item.location}
                    editeFunction={editeFunction(
                        item.item_id,
                        item.catergory,
                        item.stock_qty,
                        item.taking_price,
                        item.selling_price,
                        item.batch_no,
                        item.expire_date,
                        item.location
                    
                    )}

                    />

                    
                ))}
             

        </div>
        
    </div>
</div>

<div class="stock-div3"> 
    <h1 className='stock-add-title'>Add to Stock</h1>
    <div>
            <label className='stock-input-label'>catergory:</label>
            {/* <input type="text" id='catergory' onChange={(e)=>changeHandler(e)} value={data.catergory}/> */}
            <select id='catergory' onChange={(e)=>changeHandler(e)}>
                <option value="">select catergory</option>
                {catergories.map((item) => (
                    <option value={item.catergory_name}>{item.catergory_name}</option>
                ))}
            </select>
        </div>
        <div>
            <label className='stock-input-label'>item name :</label>
            {/* 
            <input type="text" id='item_name' onChange={(e)=>changeHandler(e)} value={data.item_name}/>  */}
            <select id='item_name' onChange={(e)=>changeHandler(e)}>
                <option value="">select Item</option>
                {items.map((item) => (
                    <option value={item.item_name}>{item.item_name}</option>
                ))}
            </select>
        </div>
        <div>
            <label className='stock-input-label'>Stock qty:</label>
            <input type="text" id='stock_qty' onChange={(e)=>changeHandler(e)} value={data.stock_qty}   />
        </div>
        <div>
            <label className='stock-input-label'>taking price:</label>
            <input type="text" id='taking_price' onChange={(e)=>changeHandler(e)} value={data.taking_price}   />
        </div>
        <div>
            <label className='stock-input-label'>selling price:</label>
            <input type="text" id='selling_price' onChange={(e)=>changeHandler(e)} value={data.selling_price}    />
        </div>
        <div>
            <label className='stock-input-label'>batch no:</label>
            <input type="text" id='batch_no' onChange={(e)=>changeHandler(e)} value={data.batch_no}   />
        </div>
        <div>
            <label className='stock-input-label'>exp date:</label>
            <input type="text" id='exp_date' onChange={(e)=>changeHandler(e)} value={data.exp_date}    />
        </div>
        <div>
            <label className='stock-input-label'>location:</label>
            <input type="text"   id='location' onChange={(e)=>changeHandler(e)} value={data.location}    />
        </div>
        <button onClick={addHandler}>Add</button>
</div>
</div>
    </div>
  )
}
