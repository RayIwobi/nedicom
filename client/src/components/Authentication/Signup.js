import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './authentic.css'
import { Link, useNavigate } from 'react-router-dom'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [username, setUsername] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate()


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


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://nedifoods-api.vercel.app/auth/signup', {username, email, password, phone, address} , { withCredentials: true })
        //axios.post('http://localhost:4000/auth/signup', {username, email, password, phone, address})
        .then((res) => {
            if(res.data.status){
                toast.success('user registered')
                navigate('/login')
            }
            else{
                toast.error(res.data.message)
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='sign-up-container'>
            <ToastContainer position="top-right" autoClose={3000} />
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <h2>Sign Up</h2> 

                <label htmlFor='username'>Name: </label>
                <input 
                    type='text' 
                    placeholder='Username' 
                    onChange={(e) => setUsername(e.target.value)} /><br />

                <label htmlFor='email'>Email: </label>
                <input 
                    type='email' 
                    autoComplete='off' 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} /><br />

                <label htmlFor='phone'>Phone Number: </label>
                <input 
                    type='number' 
                    autoComplete='off' 
                    placeholder='Phone Number' 
                    onChange={(e) => setPhone(e.target.value)} /><br />

                <label htmlFor='address'>Address: </label>
                <input 
                    type='text' 
                    autoComplete='off' 
                    placeholder='Address' 
                    onChange={(e) => setAddress(e.target.value)} /><br />

                <label htmlFor='password'>Password: </label>
                <input 
                    type='password' 
                    placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)} /> <br />

                <button type='submit' className='submit-button'>Sign up</button>
                
                <div className='bottom-link'>
                   <h5>Already have an account? </h5> 
                   <Link to='/login' >Login</Link>
                </div>
                
            </form>
        </div>
    )
}

export default Signup
