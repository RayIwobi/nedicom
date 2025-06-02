import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './authentic.css'
import { useNavigate } from 'react-router-dom'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState("")

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
        setLoading(true)

        axios.post('https://nedifoods-api.vercel.app/auth/forgotpassword', {email} , { withCredentials: true })
        //axios.post('http://localhost:4000/auth/forgotpassword', {email})
        .then((res) => {
            if(res.data.status){
                alert('check your email for reset link')
                toast.success('Check your email for reset link')
                navigate('/login')
            }else{
                alert(res.data.message || 'something went wrong, try again')
            }
        })
        .catch((err) => {
            console.log(err)
            alert('server error, please try again')
        })
    }

    return (
        <div className='sign-up-container'>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <h2>Forgot Password</h2>

                <label htmlFor='email'>Email: </label>
                <input 
                    type='email' 
                    value={email}
                    autoComplete='off' 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} /><br />

                <button type='submit' disabled={loading} className='submit-button'>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
