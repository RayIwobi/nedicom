import React, { useState, useEffect } from 'react'
import './home.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Green from './assets/videos/Green.mp4'
import banner002 from './assets/banner002.png'
import naturesBounty from './assets/naturesBounty2.jpg'

import nedifoods from './assets/nedifoods.jpg'
import nedihousehold from './assets/nedihousehold.jpg'
import nediapparels from './assets/nediapparels.jpg'

import ImageSlider from '../Slider/imageslider/ImageSlider'
import Menu from '../DropDownMenu/Menu'
import Comments from '../Comments/Comments.js'



function Home() {
  const [product, setProduct] = useState([])
  const [visiblecount, setVisiblecount] = useState(24) //limits the number of items displayed and controls the loadmore button
  const [veggiescategory, setVeggiescategory] = useState([]) //vegetables layer
  const [spicesSeason, setSpicesSeason] = useState([]) //for spices layer

 
  
  
  //Item display functionality
  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/getitems' , { withCredentials: true })
    //axios.get('https://nedifoods-api.vercel.app/getitems' , { withCredentials: true })
    //axios.get('http://localhost:4000/getitems')
    .then(res => setProduct(res.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/category/vegetables-and-greens' , { withCredentials: true })
    //axios.get('https://nedifoods-api.vercel.app/category/vegetables-and-greens' , { withCredentials: true })
    //axios.get('http://localhost:4000/category/vegetables-and-greens')
    .then(res => setVeggiescategory(res.data))
    .catch(err => console.error(err))
  },[])

  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/category/spices-and-seasonings' , { withCredentials: true })
    //axios.get('https://nedifoods-api.vercel.app/category/spices-and-seasonings' , { withCredentials: true })
    //axios.get('http://localhost:4000/category/spices-and-seasonings')
    .then(res => setSpicesSeason(res.data))
    .catch(err => console.error(err))
  },[])

  return (
    <div className='top-home'> 

       {/* Start of Categories Bar */}
       <Menu/>
      {/* End of Categories Bar */}

      {/* Photo Banner */}
        <div className='photoBanner'> 
         <div><ImageSlider/></div>
         <video autoPlay muted loop fullScreen> 
          <source src={Green} type='video/mp4'/>
            Your browser does not support the video tag. 
          </video>
         </div>
      {/* End of Photo Banner */}

    <div className='top-banner-section1'>
      <div className='food-header-title'>
        <h2>Fresh Harvest</h2>
      </div>
      <div className='flex-parent'>
      {/* -------------------------------------------------------- */}  
        {product.slice(0, visiblecount).map((p) => {
        return <div key={p._id}>
              <Link to={`/product/${p._id}`}>
                <div className='border-class'>
                <div className='flex-child1'>
                  <div className='food-image'>
                    {/* <img src={img.image} alt="product-image" /> */}
                    <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${p.image}`} alt="" />
                    </div>
                    <h2 className='food-titlee'>{p.productname}</h2>
                    <h4 className='quantity'>Weight:{p.productweight}kg</h4>
                    <div className='price-tag-both'>
                  <div className='pricetag'>
                  <h5>£{p.productprice}</h5>
                  </div>
                  <div className='former-price'>
                  <h2 style={{fontWeight:'480'}}>£{p.productoldprice}</h2>
                  </div>
                  </div>
                  <div>
                  <button className='add-to-cart-btnz'>Add to Cart</button><br/>
                  </div>
                </div>
                </div>
            </Link>
        </div>
      })}
      
  </div>
  <div className='loadmore-btn'>
      {visiblecount < product.length && (
        <button onClick={()=> setVisiblecount(visiblecount + 10)}>Load more</button>
      )}
    </div>
  </div>

      <div className='categories-advert-top'>
      <div className='categories-advert'>
        <Link to='/'><img src={nedifoods} alt='nedifoods' /></Link>
        <Link to='/nedihousehold'><img src={nedihousehold} alt='nedihouseholditems' /></Link>
        <Link to='/nediapparels'><img src={nediapparels} alt='nediapparels' /></Link>
      </div>
      </div>

        {/* second food items */}


      <div className='food-header-title'>
        <h2>Vegetables and Greens</h2>
      </div>
      <div className='flex-parent'>
      {veggiescategory.map((veggies) => {
        return <div key={veggies._id}>
              <Link to={`/product/${veggies._id}`}>
                <div className='border-class'>
                <div className='flex-child1'>
                  <div className='food-image'>
                    {/* <img src={img.image} alt="product-image" /> */}
                    <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${veggies.image}`} alt="" />
                    </div>
                    <h2 className='food-titlee'>{veggies.productname}</h2>
                    <h4 className='quantity'>Weight:{veggies.productweight}kg</h4>
                    <div className='price-tag-both'>
                  <div className='pricetag'>
                  <h5>£{veggies.productprice}</h5>
                  </div>
                  <div className='former-price'>
                  <h2 style={{fontWeight:'480'}}>£{veggies.productoldprice}</h2>
                  </div>
                  </div>
                  <div>
                  <button className='add-to-cart-btnz'>Add to Cart</button><br/>
                  </div>
                </div>
                </div>
            </Link>
        </div>
      })}
  </div>

        {/* --------------------END OF VEGETABLES AND GREENS------------------------------ */}

        <div className='banner3-section'>
          <img src={naturesBounty} alt='naturesBounty' id='naturebounty'/>
          {/* <img src={fish} alt='fish' id='fishbounty'/>  */}
        </div>


        {/* 3RD LAYER OF FOOD ITEMS */}

      <div className='food-header-title'>
        <h2>Spices and Seasoning</h2>
      </div>
      <div className='flex-parent'>
      {spicesSeason.map((spices) => {
        return <div key={spices._id}>
              <Link to={`/product/${spices._id}`}> 
                <div className='border-class'>
                <div className='flex-child1'>
                  <div className='food-image'>
                    {/* <img src={img.image} alt="product-image" /> */}
                    <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${spices.image}`} alt="" />
                    </div>
                    <h2 className='food-titlee'>{spices.productname}</h2>
                    <h4 className='quantity'>Weight:{spices.productweight}kg</h4>
                    <div className='price-tag-both'>
                  <div className='pricetag'>
                  <h5>£{spices.productprice}</h5>
                  </div>
                  <div className='former-price'>
                  <h2 style={{fontWeight:'480'}}>£{spices.productoldprice}</h2>
                  </div>
                  </div>
                  <div>
                  <button className='add-to-cart-btnz'>Add to Cart</button><br/>
                  </div>
                </div>
                </div>
            </Link>
        </div>
      })}
  </div>
       
        {/* End OF 3RD LAYER OF FOOD ITEMS  */}

      {/* third Banner */}
      <div className='banner02'>
        <img src={banner002} alt='banner02-image' />
        </div>
      {/* End third Banner */}

      <div className='comments-section'>
        <div className='commentsection-inner'>
        <Comments />
        </div>
      </div>

    </div>
  )
}

export default Home
