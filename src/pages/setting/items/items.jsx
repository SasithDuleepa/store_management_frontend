import React, { useState , useEffect} from 'react';
import './items.css'
import Axios from 'axios';
import CatergorySetting from '../../../components/catergory_setting/catergorysetting';
import Itemsetting from '../../../components/items_setting/itemsetting';


export default function Items() {
    const[addbutton, setaddbutton] = useState('setting-catergory-add-button')
  const[editebutton, setEditebutton] = useState('setting-catergory-edite-hidden')
  const[deletebutton, setdeletebutton] = useState('setting-catergory-delete-hidden')
    const[ItemData,SetItemData] = useState({
        item_name:'',
        catergory:'',
        item_file:null,
    })
    const [editingItem, setEditingItem] = useState(null);

    //item name
    const Namehandler = (e) =>{
        SetItemData({...ItemData, item_name:e.target.value});
        // setEditingItem({...ItemData, item_name:e.target.value})
    }

    //catergory
    const Catergoryhandler = (e) =>{
        SetItemData({...ItemData, catergory:e.target.value});
        
    
    }

    //file 
    const Filehandler = (e) =>{
        // console.log(e.target.files[0].name)
        const selectedFile = e.target.files[0];
        SetItemData({...ItemData, item_file: selectedFile});
        setEditingItem({...ItemData, item_file:null})
    }

    //add
    const AddHandler = async() =>{
         const formData = new FormData();
         formData.append('item_name', ItemData.item_name);
         formData.append('catergory_name', ItemData.catergory);
         formData.append('file', ItemData.item_file);
         try {
            console.log(formData);
            const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/items`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log(res.data);
        if(res.status === 200){alert("Category added successfully")}
        GetAll()

        //reset
        SetItemData(
            {
                item_name:'',
                catergory:'',
                catergory:'',
                item_file:null,
            }
        )
        

         } catch (error) {
            //handle error
            if(error.response.status === 500){
                {alert("Internal Server Error")}
            }else if(error.response.status === 400){
                { alert("please fill name and catergory")}
            }
         }
    };




    //get all items
    const[allItems, setAllItems] = useState([])
    const GetAll = async() =>{
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/items`)
        console.log(res.data)
        setAllItems(res.data)

    }
    
    
        //edite icon

        
        const EditeItem_ = (id,name,catergory,file_name) =>(e)=>{
        setaddbutton('setting-catergory-add-button-disable')
        setEditebutton('setting-catergory-update-button-active')
        setdeletebutton('setting-catergory-delete-button-active')
           
            console.log(id,name,catergory,file_name)
            setEditingItem({id,name,catergory,file_name})
            if(file_name === null || file_name === undefined || file_name === 'null'){
                SetItemData({
                    item_id:id,
                    item_name:name,
                    catergory:catergory,
                    item_file:null,
                })
            }else{
                SetItemData({
                    item_id:id,
                    item_name:name,
                    catergory:catergory,
                    item_file:file_name,
                })
            }
        }

        useEffect(() => {
            GetAll();
        }, [])

        // Function to create a preview URL for the uploaded image
  const createImagePreviewURL = () => {
    if (ItemData.item_file) {
      return URL.createObjectURL(ItemData.item_file);
    }
    return null;
  };

  //delete function
  const DeleteHandler =async()=>{
    const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/?itemId=${ItemData.item_id}`, );
    if(res.status === 200){alert("Category deleted successfully")}
    else if(res.status === 400){alert("Internal Server Error")}
    GetAll();
  }
  //update function
  const UpdateHandler = async () => {
    // console.log("UpdateHandler called");
    // console.log(ItemData);

    const formData = new FormData();
    formData.append('id', ItemData.item_id);
    formData.append('item_name', ItemData.item_name);
    formData.append('catergory', ItemData.catergory);
    formData.append('file', ItemData.item_file);
    

for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);}


try {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    
    const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/items/update`, formData, config);
    // console.log('Response:', res.data);
    if (res.status === 200) {alert("Item updated successfully");
    
        //reset
        setaddbutton('setting-catergory-add-button')
        setEditebutton('setting-catergory-edite-hidden')
        setdeletebutton('setting-catergory-delete-hidden')
        GetAll();
        SetItemData({item_id:'',
            item_name:'',
            catergory:'',
            catergory:'',
            item_file:null,
                })
    }
    else if (res.status === 400) {
        alert("Internal Server Error");
    }
    else if (res.status === 500) {
        alert("Internal Server Error");
    }
    else if (res.status === 404) {
        alert("Internal Server Error");
    }



}catch (error) {
    console.error('Error:', error);}
}

//get all available catergories
const[availableCatergories,setAvailableCatergories] = useState([])

const AvailableCatergories = async() =>{
    const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}`)
    // console.log(res.data)
    setAvailableCatergories(res.data)
}
useEffect(() => {
    AvailableCatergories();
}

, [])

  return (

    
    <div class="setting-item-parent">
        <div class="setting-item-div1">

            <h1 className='setting-item-view-title'>Items</h1>
            <div className='setting-item-search-div'>
            <input type='text' className='setting-item-view-search' placeholder='Item name' />
            </div>
            
            <div className='setting-item-view-sub'>
                

                {allItems.map((items)=>(
                    <Itemsetting
                        key={items.item_id}
                        itemname={items.item_name}
                        catergory={items.catergory_name                        }
                        editeFunction={EditeItem_(items.item_id,items.item_name,items.catergory_name  ,items.item_file)}
                        ItemFile_name={items.item_file}
                        />
                ))}
            </div>
        </div>
        <div class="setting-item-div2">
            <div>
                <h1 className='setting-item-add-title'>Add Item</h1>
                <div className='setting-item-add-input-div'>
                   <label className='setting-item-add-label'>Item name :</label><br/>
                   <input className='setting-item-add-input' type='text' onChange={(e)=>Namehandler(e)} value={ItemData.item_name} />
                </div>
                <div className='setting-item-add-input-div'>
                    <label className='setting-item-add-label'>Catergory :</label><br/>
                    {/* <input type='text' onChange={(e)=>Catergoryhandler(e)} value={ItemData.catergory}/> */}
                    <select onChange={(e)=>Catergoryhandler(e)} value={ItemData.catergory}>
                        <option value="">Select Catergory</option>
                        
                        {availableCatergories.map((catergory)=>(
                            <option value={catergory.catergory_name}>{catergory.catergory_name}</option>
                        ))}
                    </select>
                </div>
                <div  className='setting-item-add-input-div'>
                    <label className='setting-item-add-label'>Image :</label><br/>
                    <input type='file' className='setting-item-file-input' onChange={(e)=>Filehandler(e)} />
                    <div className='setting-item-add-image-preview'>
                    <img
                    className='setting-item-add-image-preview-img'
                     src={editingItem && editingItem.file_name? `${process.env.REACT_APP_BACKEND_URL}/items/file/?ItemFile=${editingItem.file_name}`
                         : createImagePreviewURL() }
                         alt=""
                      width="100px"
                         height="100px"
                    />
            </div>
                
                </div>
                <button className={addbutton} onClick={AddHandler}>ADD</button>
                <div className='button-div'>
          <button className={editebutton} onClick={UpdateHandler} >Update</button>
          <button className={deletebutton} onClick={DeleteHandler} >Delete</button>
          </div>
            </div>
        </div>
    </div>
  )
}
