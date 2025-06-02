import React, { useContext} from 'react'
import './cartpage.css'
import { CartContext } from '../CartReduxEngine/ContextProvider'
import { totalItem, totalPrice } from '../CartReduxEngine/CartReducer'
import { Link, useNavigate } from 'react-router-dom'
import handpointing from './handpointing.png'
import cartimg from '../home/assets/cart.png'
import axios from 'axios'
//import { loadStripe } from '@stripe/stripe-js';


//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useState } from 'react'



function CartPage({product}) {
  const {cart, dispatch} = useContext(CartContext)
  const [currentUser, setCurrentUser] = useState('')

  const navigate = useNavigate()

  const increase = (_id) => {
    const Index = cart.findIndex(p => p._id === _id)
    if(cart[Index].productquantity < 10){
      dispatch({type: "Increase", _id})
    }
  }

  const decrease = (_id) => {
    const Index = cart.findIndex(p => p._id === _id)
    if(cart[Index].productquantity > 1){
      dispatch({type: "Decrease", _id})
    }
  }

  const Remove = (_id) => {
    const confirm = window.confirm('Are you sure you want to remove the item?') //window.confirm is for double confirmation before action
    if(confirm){
    dispatch({type: "Remove", _id})
    }
  }
      //if user is not logged in they cannot see the cart page
      useEffect(() => {
                const checkAuth = async () => {
                    try{
                        const res = await axios.get('https://nedifoods-api.vercel.app/auth/verify', {
                        //const res = await axios.get('http://localhost:4000/auth/verify', {
                            withCredentials:true
                        })
                        if (res.data.status){
                            
                        }
                        else{
                          navigate('/dashboard')
                        }
                    }
                    catch(err){
                        console.log(err)
                    }
            }
            checkAuth()
    },[navigate])

    useEffect(() => {
      axios.get('https://nedifoods-api.vercel.app/auth/dashboard', {withCredentials:true})
      //axios.get('http://localhost:4000/auth/dashboard', {withCredentials:true})
      .then(res => {
        setCurrentUser(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
    })


  const checkout = async () => {
  try {

    //const user = JSON.parse(localStorage.getItem('currentUser._id')); // adapt this to your app's key
    const userId = currentUser._id;
    const userEmail = currentUser.email
    //const phone = currentUser.phone  //not collecting it at the moment

    if (!userId) {
      toast.error("User not logged in");
      return;
    }
    
    //const response = await axios.post('https://nedifoods-api.vercel.app/create-checkout-session', {
    //const response = await axios.post('http://localhost:4000/create-checkout-session', {cart, userId, userEmail}, {withCredentials:true});
    const response = await axios.post('https://nedifoods-api.vercel.app/create-checkout-session', {cart, userId, userEmail}, {withCredentials:true});
    
    console.log("Stripe Checkout URL:", response.data.url);

    if (response.data && response.data.url) {
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } else {
      toast.error('Stripe session failed to create.');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    toast.error('Error during checkout');
  }
};


  return (
    <div className='cart-container'>
      <div>
         <ToastContainer position="top-right" autoClose={3000} />
         <div className='cartpagetitle-link'>
           <h2>&nbsp;<img src={cartimg} alt='' id='cartimg'/>Cart Items</h2>
           <Link to='/'><h4><img src={handpointing} alt='' id='handpointing'/>Add items to cart</h4></Link>
         </div>
       <br/>
       <div className='product-cart-container'>
       <div className='cart-container'>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src={cartimg} alt="Empty cart" className="empty-cart-img" style={{width:'200px', height:'200px'}} />
          <h3>No items in cart</h3>
          
          <Link to="/">
            <h4 style={{color:'blue', fontStyle:'italic'}}><img src={handpointing} alt="add more" id="handpointing" /> Add items to cart</h4>
          </Link>
        </div>
        ) : ( 
          cart.map((p) => {
            return (
              <div key={p._id} className='cart-product'>
                <div className='cart-image'> 
                  <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${p.image}`} alt=""  style={{width:'150px', height:'150px'}}/>
                </div>
                <div className='cart-product-details'>
                  <div>Product:&nbsp;{p.productname}</div>
                  <div id='price'>Price: ${p.productprice}</div>
                  <div id='quantity'>Quantity:&nbsp;
                    <button onClick={() => decrease(p._id)}>-</button>
                    <button>{p.productquantity}</button>
                    <button onClick={() => increase(p._id)}>+</button>
                  </div>
                  <button onClick={() => Remove(p._id)} id='remove-button'>Remove</button>
                </div>
              </div>
            )
          })
        )}
        </div>
      
      <div className='checkout-container'>
      <div className='checkout-corner'>
        <br/>
        <div className='checkout-title'>
        <h2>Product Checkout</h2>
        <h3>{currentUser._id}</h3>
        <h3>{currentUser.username}</h3>
        <h3>{currentUser.email}</h3>
        <h4 style={{color:'#8B0000'}}>{'(Total items includes quantity of each item in the cart)'}</h4>
        </div>
        <br/><br/>
        <div id='checkoutarea'>
        <div className='checkout-items'>Total items: {totalItem(cart)}</div>
        <div className='checkout-items'>Total price: ${totalPrice(cart)}</div>
        <button onClick={checkout}>Checkout</button>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default CartPage
