import React from 'react'
import './footer.css'
import {Link} from 'react-router-dom'
import mastercard from './assets/mastercard.png'
import paypal from './assets/paypal.png'
import stripe from './assets/stripe.jpg'
import visa from './assets/visa.jpg'
import verve from './assets/verve.png'
import logo1 from '../navigation/assets/nedilogo1.png'
import facebook from '../home/assets/facebook.png'
import instagram from '../home/assets/instagram.png'
import twitter from '../home/assets/twitter.png'
import youtube from '../home/assets/youtube.png'
import tiktok from '../home/assets/tiktok.png'


function Footer() {
  return (
    <>
    <div className='footer-container'>
      <div className='footer-logo-name'>
        <img src={logo1} alt='logo of the site' className='footer-top-logo'/>
        <h2>NediFoods<span>&reg;</span></h2>
      </div>
      

   <div className='footer-inner-second'>
  <div>
    <h3 className='useful-links'>Who we are</h3>
      <Link to='/'>Home</Link>
      <Link to='aboutus'>About us</Link>
      <Link to='/returnpolicy'>Return Policy</Link>
      <Link to='/termsofservice'>Terms of service</Link>
    </div>

    <div >
    <h3 className='useful-links'>Need help?</h3>
      <Link to='/contact'>Contact us</Link>
      <Link to='/support'>Support</Link>
      <Link to='/deliverypolicy'>Delivery Policy</Link>
      <Link to='/categories'>Categories</Link>
    </div> 
    </div> 

     <div className='footer-aboutus'>
    <h3 className='footer-about-header'>Brief intro</h3>
      <p className='footer-about-content'>NediFoods is a dedicated African 
        food supplier committed to bringing authentic, 
        high-quality African groceries to Harpenden, 
        Hertfordshire, and its surrounding areas.</p>
    </div>
   <div className='footer-cardarea'>
    <h2 className='we-accept'>We accept</h2>
    <div className='footer-cards'>
    <img src={mastercard} alt='mastercard'/>
    <img src={visa} alt='visa'/>
    <img src={stripe} alt='stripe'/>
    <img src={verve} alt='verve'/>
    <img src={paypal} alt='paypal'/>
    </div>
    </div>

    <div className='social-section'>
      <h3>Connect with us</h3>
    <div className='socialmedia'>
        <Link><img src={facebook} alt='facebook'/></Link>
        <Link><img src={instagram} alt='instagram'/></Link>
        <Link><img src={twitter} alt='twitter'/></Link>
        <Link><img src={youtube} alt='instagram'/></Link>
        <Link><img src={tiktok} alt='twitter'/></Link>
      </div>
      </div>
     
    </div>
    <div className='under-trademark'>
    <h3>NediFoods&reg; | All rights reserved &copy; 2025 | Built by <span style={{fontStyle:'italic'}}>Techlod</span></h3>
  </div>
  </>
  )
}

export default Footer