import React, {useState, useEffect, useContext} from 'react'
import './product.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { CartContext } from '../CartReduxEngine/ContextProvider'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ProductPage() {
    const {cart, dispatch} = useContext(CartContext)//for cart from yousaf

  const [items, setItems] = useState([])
  const navigate = useNavigate()

    const [product, setProduct] = useState('')
    const [visiblecount, setVisiblecount] = useState(24) //limits the number of items displayed and controls the loadmore button
  

  const [showgotocartbtn, setShowgotocartbtn] = useState(() => { //the goto cart button appears only when add to cart is activated
    return sessionStorage.getItem('showgotocartbtn') === 'true'
  });

  const {_id} = useParams() 

     useEffect(() => {
        //axios.get('http://localhost:4000/auth/verify' ,{ withCredentials: true })
        axios.get('https://nedifoods-api.vercel.app/auth/verify' ,{ withCredentials: true })
        .then((res) => {
            if(res.data.status){

            }
            else{
                navigate('/login')
            }
        })
    }, [navigate])

  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/getitems' , { withCredentials: true })
    //axios.get('http://localhost:4000/getitems' , { withCredentials: true })
    .then(res => setItems(res.data))
    .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/product/'+_id , { withCredentials: true })
    //axios.get('http://localhost:4000/product/'+_id , { withCredentials: true })
    .then((res) => setProduct(res.data))
    .catch((err) => console.log(err))
  },[_id])

  

  const handleCart = () => { //for cart from yousaf
    setShowgotocartbtn(true) //for go to cart btn
    sessionStorage.setItem('showgotocartbtn', 'true') //to store the goto cart btn
    dispatch({type: "Add", product:product})
    toast.success('Item added to cart')
  }

  //increasing / decreasing quantity of items
    const increase = (_id) => {
    const Index = cart.findIndex(p => p._id === _id)
    if (Index !== -1 && cart[Index].productquantity < 10) {
    dispatch({ type: "Increase", _id });
  }
  }

  const decrease = (_id) => {
    const Index = cart.findIndex(p => p._id === _id)
    if (Index !== -1 && cart[Index].productquantity > 1) {
    dispatch({ type: "Decrease", _id });
  }
  }


  return (
    <div className='conni1'>
      <ToastContainer position="top-right" autoClose={3000} className='mobile-color'/> 
      <hr className='horizontal-rule'/>
    <div className='main-productcontent'>
      <div className='inner-productcontent'>
        <div className='product-image'>
        <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${product.image}`} alt="" />
        </div> 
        <div className='product-description'>
            <h3 className='product-title'>{product.productname}</h3>
            <h4 className='quantity'>Weight:{product.productweight}kg</h4>
            <h4 className='quantity'>Quantity: {product.productquantity}</h4>
            <div id='quantity'>Quantity: &nbsp;
            <button onClick={() => decrease(product._id)}>-</button>
            <button>{product.productquantity}</button>
            <button onClick={() => increase(product._id)}>+</button>
            </div>
            <Link to=''><h3 className='product-category'>Category: {product.category}</h3></Link>
            <div className='product-price'>
              <h3>£{product.productprice}</h3>
              <h5>£{product.productoldprice}</h5>
              </div>
              
            <button className='add-to-cartButton'
            onClick={handleCart}>Add to cart</button>

            {showgotocartbtn && 
            (<Link to='/cart'><button  className='add-to-cartButton'>
              Go to Cart</button></Link>)}
            
            <div className='product-details'>
                <h3>Product Description</h3>
                <p>
                {product.description}
                </p>
            </div>
        </div>
      </div>
      {/* <div className='customer-comments'>
        <hr/>
        <h3>Customer Reviews</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum."
                </p>
                <br/>
                <br/>
                <h3>Customer Reviews</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum."
                </p>
              
      </div> */}

      <h2 className='buymore-title'>Some items you might like</h2>
      <div className='top-banner-section1' >
            <div className='flex-parent' >
            {/* -------------------------------------------------------- */}  
              {items.slice(0, visiblecount).map((p) => {
              return <div key={p._id} id='top-banner-product-section'>
                    <Link to={`/product/${p._id}`} id='inner-position'>
                      <div className='border-class' id='borderclass-mobile'>
                      <div className='flex-child1'>
                        <div className='food-image-product'>
                          {/* <img src={img.image} alt="product-image" /> */}
                          <img src={`https://res.cloudinary.com/dvjnwualn/image/upload/${p.image}`} alt="" />
                          </div>
                          <h2 className='food-titlee' id='foodtitle'>{p.productname}</h2>
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
    </div>
     
    </div>
  )
}

export default ProductPage
//the new product page
