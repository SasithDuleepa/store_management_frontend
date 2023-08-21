import React, { useState , useEffect} from 'react';
import './catergory.css';

import Axios from 'axios';
import CatergorySetting from '../../../components/catergory_setting/catergorysetting';



export default function Catergory() {
  const[addbutton, setaddbutton] = useState('setting-catergory-add-button')
  const[editebutton, setEditebutton] = useState('setting-catergory-edite-hidden')
  const[deletebutton, setdeletebutton] = useState('setting-catergory-delete-hidden')
  
  const [catergoryData, setCatergoryData] = useState({
    Catergory: '',
    file: null,
  });

  const [editingCategory, setEditingCategory] = useState(null); // State to hold editing category data

  const Namehandler = (e) => {
    setCatergoryData({ ...catergoryData, Catergory: e.target.value });
    setEditingCategory({ ...editingCategory, name: e.target.value })
  };

  const Filehandler = (e) => {
    const selectedFile = e.target.files[0];
    setCatergoryData({ ...catergoryData, file: selectedFile });
    setEditingCategory(null)
  };

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append('category', catergoryData.Catergory);
    formData.append('file', catergoryData.file);
    try {
      console.log(catergoryData);
      const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      if(res.status === 200){alert("Category added successfully")}
  
      // Reset
      setCatergoryData({
        Catergory: '',
        file: null,
      });
    } catch (error) {
      // Handle Error 
      if(error.response.status === 500){alert("Internal Server Error")}
      
      else if(error.response.status === 400){ alert("please fill catergory name")}
    }
  
    
    
  };
  
  const[catergories,setCatergories] = useState([])
  //get all catergories
  const getAllCatergories = async () => {
    const getAllCatergories = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
    console.log(getAllCatergories.data);
    setCatergories(getAllCatergories.data);
  }



  //function for edite icon
  const Edite =(id,name,file_name) => (e)=>{
    setaddbutton('setting-catergory-add-button-disable')
    setEditebutton('setting-catergory-update-button-active')
    setdeletebutton('setting-catergory-delete-button-active')
    
    
    setEditingCategory({ id, name, file_name });
    console.log(id, name, file_name);
    if(file_name === null || file_name === undefined || file_name === 'null'){
      setCatergoryData({
        catergory_id:id,
        Catergory: name,
        file_name: null,
      })
    }else{
      setCatergoryData({
        catergory_id:id,
        Catergory: name,
        file: file_name,
  
    }
    )
    }
    
  }

  useEffect(() => {
    getAllCatergories();
  }, [])
  

  // Function to create a preview URL for the uploaded image
  const createImagePreviewURL = () => {
    if (catergoryData.file) {
      return URL.createObjectURL(catergoryData.file);
    }
    return null;
  };

  //delete function
  const DeleteHandler =()=>{
    console.log(editingCategory)

  }

  //update function
  const UpdateHandler = async() =>{
    const formData = new FormData();
    formData.append('id', catergoryData.catergory_id);
    formData.append('category', catergoryData.Catergory);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }
    
    if(catergoryData.file){
      // console.log('file')
      formData.append('file', catergoryData.file);}
    else{formData.append('file', null);}
    

    const res =await Axios.put(`${process.env.REACT_APP_BACKEND_URL}`    , formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res)
  }
  return (
    <div class="setting-catergory-parent">
      <div class="setting-catergory-div1">
      <h1 className='setting-catergory-view-title'>Catergories</h1>
        <div  className='setting-catergory-sub-div'>
          {/* ... */}
        {catergories.map((catergory) => (
  <CatergorySetting
    key={catergory.catergory_id}
    catergory_name={catergory.catergory_name}
    catergoryFile_name={catergory.catergory_file}
    editeFunction={Edite(catergory.catergory_id,catergory.catergory_name,catergory.catergory_file)}
  />
))}

        </div>
        
        

      </div>


      <div class="setting-catergory-div2">
        {/* ... */}
        <div className='setting-catergory-add-div'>
          <h1 className='setting-catergory-add-title'>Add</h1>
          <div className='setting-catergory-add-input-div'>
            <label className='setting-catergory-add-name-label'> Catergory Name :</label><br />
            <input
            className='setting-catergory-name-input'
            type='text'
            id='catergoryName'
            value={editingCategory ? editingCategory.name : catergoryData.Catergory}
            onChange={(e) => Namehandler(e)}
          />
          </div>
          <div className='setting-catergory-add-image-div'>
            <label className='setting-catergory-add-image-label'>Image :</label><br />
            <input
            className='setting-catergory-file-input'
            type='file'
            id='catergoryImage'
            onChange={(e) => Filehandler(e)}
          />

          
            <div className='setting-catergory-add-image-preview'>
            <img
              src={
                editingCategory && editingCategory.file_name
                  ? `${process.env.REACT_APP_BACKEND_URL}/file/?CatergoryFile=${editingCategory.file_name}`
                  : createImagePreviewURL()
              }
              alt=""
              width='100px'
              height='100px'
              
            />
            </div>
          </div>
          <button className={addbutton} onClick={handleAddCategory}>ADD</button>
          <div className='button-div'>
          <button className={editebutton} onClick={UpdateHandler} >Update</button>
          <button className={deletebutton} onClick={DeleteHandler} >Delete</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
