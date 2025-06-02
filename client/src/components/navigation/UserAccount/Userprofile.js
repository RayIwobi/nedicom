import React, { useState, useEffect, useRef } from 'react';
import './account.css'; // Move styles here or use styled-components
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import dropdown from '../assets/dropdown.png'
import axios from 'axios'


const Userprofile = () => {
  const [isMobileActive, setIsMobileActive] = useState(false);
  const dropdownRef = useRef(null);

  const [showuser, setShowuser] = useState("")

  // Detect mobile
  const isMobile = () =>
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  const handleToggle = () => {
    if (isMobile()) {
      setIsMobileActive((prev) => !prev);
    }
  };

  // Close on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMobileActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  //to use the current user's info
  axios.defaults.withCredentials = true
       useEffect(() => {
          //axios.get('http://localhost:4000/auth/verify' ,{ withCredentials: true })
          //axios.get('https://nedifoods-api.vercel.app/auth/verify' ,{ withCredentials: true })
          axios.get('https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/auth/verify' ,{ withCredentials: true })
          .then((res) => {
              if(res.data.status){
              }
             
          })
      }, [])

      useEffect(() => {
    //axios.get('http://localhost:4000/auth/dashboard',{ withCredentials: true })
   // axios.get('https://nedifoods-api.vercel.app/auth/dashboard',{ withCredentials: true })
    axios.get('https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/auth/dashboard',{ withCredentials: true })
    .then(res => setShowuser(res.data))
    .catch(err => console.log(err))
    },[])

  return (
    <div
      className={`dropdown1 ${isMobileActive ? 'active' : ''}`}
      onClick={handleToggle}
      ref={dropdownRef}
    >
      <div className="dropdown-toggle1">
        <PersonOutlineIcon id='account-icon'/>
        <img src={dropdown} alt='dropdown' />
        </div>
      <div className="dropdown-menu1">
        <div>{setShowuser ? showuser.username : <div>Account</div>}</div>
        <Link to='/login'>Login</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </div>
    </div>
  );
};

export default Userprofile;
