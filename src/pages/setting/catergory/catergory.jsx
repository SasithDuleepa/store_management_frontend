import React, { useState , useEffect} from 'react';
import './catergory.css';

import Axios from 'axios';
import CatergorySetting from '../../../components/catergory_setting/catergorysetting';



export default function Catergory() {
  const [catergoryData, setCatergoryData] = useState({
    Catergory: '',
    file: null,
  });

  const [editingCategory, setEditingCategory] = useState(null); // State to hold editing category data

  const Namehandler = (e) => {
    setCatergoryData({ ...catergoryData, Catergory: e.target.value });
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
      const res = await Axios.post('http://localhost:8080', formData, {
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
    const getAllCatergories = await Axios.get('http://localhost:8080');
    console.log(getAllCatergories.data);
    setCatergories(getAllCatergories.data);
  }



  //function for edite icon
  const Edite =(id,name,file_name) => (e)=>{
    setEditingCategory({ id, name, file_name });
    console.log(id, name, file_name);
    if(file_name === null || file_name === undefined || file_name === 'null'){
      setEditingCategory({
        Catergory: name,
        file_name: 'file-1691735122040-curry.png',
      })
    }else{
      setCatergoryData({
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
  return (
    <div class="setting-catergory-parent">
      <div class="setting-catergory-div1">
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
      <div class="setting-catergory-div2">
        {/* ... */}
        <div className='setting-catergory-add-div'>
          <div>
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

          
            <div>
            <img
              src={
                editingCategory && editingCategory.file_name
                  ? `http://localhost:8080/file/?CatergoryFile=${editingCategory.file_name}`
                  : createImagePreviewURL()
              }
              alt=""
              width='100px'
              height='100px'
            />
            </div>
          </div>
          <button className='setting-catergory-add-button' onClick={handleAddCategory}>ADD</button>
        </div>
      </div>
    </div>
  );
}
