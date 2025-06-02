import React, { useEffect, useState } from 'react'
import './authentic.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
        const navigate = useNavigate()

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const [message, setMessage] = useState('')

        
        useEffect(() => {
            const checkAuth = async () => {
                try{
                    const res = await axios.get('https://nedifoods-api.vercel.app/auth/verify', {
                    //const res = await axios.get('http://localhost:4000/auth/verify', {
                        withCredentials:true
                    })
                    if (res.data.status === true){
                        navigate('/dashboard')
                    }
                    
                }
                catch(err){
                    console.log(err)
                }
            }
            checkAuth() 
        },[navigate])
        

        

        axios.defaults.withCredentials = true   //must be added to prevent error generation from backend
        const handleLogin = (e) => {
            if(!email){
                setMessage("You need to add your email")
            }
            e.preventDefault()
            axios.post('https://nedifoods-api.vercel.app/auth/login',{email, password}, {withCredentials: true})
            //axios.post('http://localhost:4000/auth/login',{email, password}, {withCredentials: true})
            .then((res) => {
                if(res.data.status){
                    navigate('/dashboard')
                }
                else{
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error('db connection error')
                console.log(err)
            })
        }
    
  return (
    <div className='sign-up-container'>
        <ToastContainer position="top-right" autoClose={3000} />
    <form className='sign-up-form' onSubmit={handleLogin}>
        
        <h2>Login</h2>
        <h5 style={{textAlign:'center'}}>We need your details to serve you better</h5>
        <br/>

        <label htmlFor='email'>Email: </label>
        <input required
            type='email' 
            //value={email}
            autoComplete='off' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} /><br />

        <label htmlFor='password'>Password: </label>
        <input required 
            type='password' 
            //value={password}
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} /> <br />

        <button type='submit' className='submit-button'>Login</button>
        <Link to='/forgotpassword' className='forgotpassword'>Forgot Password</Link>
        <div className='bottom-link'>
            <h3>Don't have an account? </h3>
            <Link to='/signup'>Sign up</Link>
        </div>
        {message}
        </form>
        
</div>

  )
}

export default Login
