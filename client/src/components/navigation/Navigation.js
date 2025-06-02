import React, { useEffect, useRef, useState, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './navigation.css'
import logo1 from './assets/nedilogoblack.png'
import cartimage from '../home/assets/cart.png'
// import logo2 from './assets/nedilogo2.png'

import { CartContext } from '../CartReduxEngine/ContextProvider'
import SearchBar from './SearchFunction/SearchBar'
import Categories from './nedicategories/Categories'
import Userprofile from './UserAccount/Userprofile'



function Navigation() {
    const {cart} = useContext(CartContext) 

    const [isOpen, setIsOpen] = useState(false); //state for the mobile menu

    const toggleMenu = () => {   //for the 3lines mobile menu
        setIsOpen(prev => !prev);
    };

    const dropdownRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
 
    //login disappears logic
     const location = useLocation();

    //the two lines below were used to hide the searchbar and cart on the login and other specified pages
    const hiddenPaths = ['/login','/signup', '/dashboard', '/forgotpassword', '/reset-password/', '/update-password', '/mainpage' ];
    const shouldHideSection = hiddenPaths.includes(location.pathname);

  return (
    <div className='top-navigation'>
        <div className='middle-navigation1'>
        <Link to='/'>
          <div className='logo-and-name'>
          <img src={logo1} alt='' className='navigation-logo'/>
          <h2 className='sitetitle'>NediFoods&reg;</h2>
          </div>
          </Link>
          <div className='nav-phrase'>
            <h2>Real Naija ingredients. Delivered raw. Cooked with love.</h2>
          </div>

          <div className='nav-links'>

            <div className="categories-wrapper">
              <h2 className="categories-dropdown">Nedi Group</h2>
              <ul className="categories-dropdown-content">
                <li style={{backgroundColor:'#FC6A03'}}><Link to="/">NediFoods</Link></li>
                <li style={{backgroundColor:'#FC6A03'}}><Link to="/nediapparels">Nedi Apparels</Link></li>
                <li style={{backgroundColor:'#FC6A03'}}><Link to="/nedihousehold">Nedi Household Items</Link></li>
              </ul>
            </div>

            <h2 className='link-border'> | </h2>
            <Link to='/aboutus'>
            <h2>About us</h2> 
            </Link>
            <h2 className='link-border'> | </h2>
            <Link to='returnpolicy'>
            <h2>Our policy</h2>
            </Link>
            <h2 className='link-border'> | </h2>
            <Link to='/contact'>
            <h2>Contact</h2>
            </Link>
            <h2 className='link-border'> | </h2>
            <Link to='/support'>
            <h2>Support</h2>
            </Link> 
          </div>
        </div>


          {/* MOBILE MENU START */}
                <div className="s-dropdown" ref={dropdownRef}>
                 <div className='mobile-menu-toggle'>
                  <Link to='/'>
                  <div style={{display:'flex'}}>
                    <img src={logo1} alt='' className='navigation-logo'/>&nbsp;
                    <h2 className='sitetitle' style={{fontSize:'30px'}}>NediFoods<span>&reg;</span></h2>
                    </div>
                  </Link>
                 
                   
                     <button 
                         className="s-dropdown-toggle" 
                         onClick={toggleMenu} 
                         aria-expanded={isOpen}
                     >
                         ☰
                     </button>
                     </div>
                     
         
                     {isOpen && (
                      <>
                     <div className='s-dropdown-menu'>
                         <Link to='/' onClick={() => setIsOpen(false)}>Home</Link>
                         <Link to='/aboutus' onClick={() => setIsOpen(false)}>About us</Link>
                         <Link to='/deliverypolicy' onClick={() => setIsOpen(false)}>Delivery</Link>
                         <Link to='/returnpolicy' onClick={() => setIsOpen(false)}>Our policy</Link>
                         <Link to='/contact' onClick={() => setIsOpen(false)}>Contact</Link>
                         <Link to='/support' onClick={() => setIsOpen(false)}>Support</Link>
                         </div>
                         <div><Categories  onClick={() => setIsOpen(false)}/></div>
                        </> 
                     )}
                 </div>
        {/* MOBILE MENU END */}

              {!shouldHideSection && (
                <div className='logo-search-accountareatop'>
                <div className='second-logo-area'>
                <img src={logo1} alt='the-logo' className='middlebar-logotop'/>
                 {/*<h2 className='nedifoods-titletop'>NediFoods</h2> */}
                </div>
                <div className='search-bartop'>
                  {/* <div className='searchicontop'>
                    <SearchIcon style={{width:'40px', height:'35px'}}/>
                  </div> */}
                  <div><SearchBar/></div>
                </div>
                
                <div className='account-carttop'>
                 <div className='personicon'> 
                 <Userprofile/>
                 </div>
                 <Link to='/support'><h3 className='helpText' style={{color:'black'}}>Help</h3></Link>
                 <Link to='/cart'>
                 <div className='cart-items'>
                  <img src={cartimage} alt='' className='cartIcontop'/>
                   <h2 className='cart-count-top'>{cart.length}</h2> 
                 </div>
                 </Link>
                </div>

              </div>
              )}
              
    </div>
  )
}

export default Navigation
