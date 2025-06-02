import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import './imageupload.css'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProduct() {
      const [selectedoption, setSelectedoption] = useState('') //for category selection
  
    const [file, setFile] = useState('')
    const [items, setItems] = useState({
        productname:'',
        productweight:'',
        productquantity:'',
        productprice:'',
        productoldprice:'',
        category:'',
        description:''
    })

    const {_id} = useParams()
    const navigate = useNavigate()
   

    useEffect(() => {
      axios.get('https://nedifoods-api.vercel.app/readitems/'+_id , { withCredentials: true })
      //axios.get('http://localhost:4000/product/'+_id , { withCredentials: true })
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err))
    },[_id])  


    const handleChange = (e) => {
        const {name, value} = e.target;
        setItems({...items, [name]: value}) 
    }

    //Category dropdown code
    const handleSelectChange = (event) => {
      const value = event.target.value
      setSelectedoption(value)
      setItems(prev => ({
        ...prev,
        category: value
      }))
    }



    const Itemsupdate = () => {
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('productname', items.productname)
        formdata.append('productweight', items.productweight)
        formdata.append('productquantity', items.productquantity)
        formdata.append('productprice', items.productprice)
        formdata.append('productoldprice', items.productoldprice)
        formdata.append('category', items.category)
        formdata.append('description', items.description)

        axios.put(`https://nedifoods-api.vercel.app/updateitems/${_id}`, formdata)
        console.log(formdata)
        //axios.put(`http://localhost:4000/updateitems/${_id}`, formdata)
        .then(res => {
          toast.success('Item updated successfully');
          console.log(res)
        })
        .catch(error => {
          toast.error('Something went wrong');
          console.log(error)
        })
        navigate('/uploads')
    }

    
  return (
     <div className='update-container'>
          <ToastContainer position="top-right" autoClose={3000} />
      
      <h3>Make your changes here</h3><br/>
          <input 
            type='file'
            onChange={e => setFile(e.target.files[0])}
          />
          <input 
            type='text'
            name='productname'
            value={items.productname}
            onChange={handleChange}
            placeholder='type product name'
          />
          <input 
            type='number'
            name='productweight'
            value={items.productweight}
            onChange={handleChange}
            placeholder='type product weight'
          />
          <input 
            type='number'
            name='productquantity'
            value={items.productquantity}
            onChange={handleChange}
            placeholder='type product quantity'
          />
          <input 
            type='number'
            name='productprice'
            value={items.productprice}
            onChange={handleChange}
            placeholder='type product price'
          />
          <input 
            type='number'
            name='productoldprice'
            value={items.productoldprice}
            onChange={handleChange}
            placeholder='type old price'
          />
      <select value={selectedoption} onChange={handleSelectChange}>
        <option value=''>Select product category</option>
        <option value='staples-and-grains'>Staples and Grains</option>
        <option value='tubers-and-root-crops'>Tubers and Root Crops</option>
        <option value='spices-and-seasonings'>Spices and Seasonings</option>
        <option value='vegetables-and-greens'>Vegetables and Greens</option>
        <option value='oils-and-condiments'>Oils and Condiments</option>
        <option value='meat,-fish-and-sea-food'>Meat, Fish and Sea Food</option>
        <option value='dairy-and-beverages'>Dairy and Beverages</option>
        <option value='snacks-and-sweets'>Snacks and Sweets</option>
        <option value='frozen-and-canned-foods'>Frozen and Canned Foods</option>
      </select>
      
     <br/>
          <textarea 
            type='text'
            name='description'
            value={items.description}
            onChange={handleChange}
            placeholder='type product description'
          />
          <div className='button-controls'>
          <button onClick={Itemsupdate}>Upload</button>
          <Link to='/uploads' className='canni'><button>Go back</button></Link>
          </div>
        </div>
  )
}

export default UpdateProduct
