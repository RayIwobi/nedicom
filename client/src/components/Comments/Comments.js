import React, { useEffect, useState } from 'react';
import './comments.css'
import axios from 'axios'
// import {Link } from 'react-router-dom'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Comments() {
    const [comment, setComment] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [getcomments, setGetcomments] = useState([])  


    //for getting or showing all the comments
    useEffect(() => {
        axios.get('https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/read' , { withCredentials: true })
        //axios.get('https://nedifoods-api.vercel.app/read' , { withCredentials: true })
        //axios.get('http://localhost:4000/comments/read' , { withCredentials: true })
        .then(res => {
            console.log(res.data)
            setGetcomments(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    //to authenticate the user
    useEffect(() => {
        //axios.get('http://localhost:4000/auth/dashboard', {withCredentials: true})
        //axios.get('https://nedifoods-api.vercel.app/auth/dashboard', {withCredentials: true})
        axios.get('https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/auth/dashboard', {withCredentials: true})
        .then(res => setCurrentUser(res.data))
        .catch(() => setCurrentUser(null))
    },[])

    const handlePost = (e) =>{
        e.preventDefault()
        if(comment === ''){
            toast.warning("Type something")
        }
        else{
        //axios.post('http://localhost:4000/comments/sendcomment', {comment}, {withCredentials:true})
        //axios.post('https://nedifoods-api.vercel.app/comments/sendcomment', {comment}, {withCredentials:true})
        axios.post('https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/comments/sendcomment', {comment}, {withCredentials:true})
        .then(res => {
            console.log(res)
            toast.success('Comment added!')

            //setGetcomments(prev => [...prev, newComment]);
            setGetcomments(prev => [res.data, ...prev]);
        })
        
        .catch(err => {
            console.log(err);
            toast.error('something went wrong')
        })
        setComment('')
        }
    }


    const handleDelete = (delid) => {
        const deletecomment = getcomments.filter((com) => (
            com._id !== delid
        ))
        setGetcomments(deletecomment)

        axios.delete(`https://nedifoods-ofgbne3v6-raymonds-projects-8d7db693.vercel.app/deletecomment/${delid}`, {withCredentials:true} )
       // axios.delete(`https://nedifoods-api.vercel.app/deletecomment/${delid}`, {withCredentials:true} )
        //axios.delete(`http://localhost:4000/comments/deletecomment/${delid}`, {withCredentials:true} )
        .then(res => {
            toast.success('Deleted successfully')
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div className='container'>
        <ToastContainer position="top-right" autoClose={3000} />
        <div>
        <div className='comment-title'>
            <h3>Leave us a comment</h3>
        </div>
        <div className='comments-input-section' id='comment-texarea'>
            
            <textarea
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Tell us what you think'
                className='comment-textarea'
            />
             {currentUser && currentUser._id ? (
                <button onClick={handlePost}>Send</button>
            ):(
                <div style={{color:'red'}}>login to leave a comment</div>
            )}
            
        </div>
          <hr className='horizontal-line'/>
        <div className='comment-container'>
            <br/>

            <h3>&nbsp;Comments</h3>
            {/*  {Array.isArray(getcomments) && getcomments.map((com) to check if getcomments is an array even after logout */}
            {Array.isArray(getcomments) && getcomments.map((com) => (
            <div key={com._id} className='comment-display-section'>
                <div className='user-comment'>
                <div className='name-time'>
                    {com.user?.username}&nbsp;
                    <span className='time'><small>{new Date(com.createdAt).toLocaleString()}</small></span>
                </div>
                <div>{com.comment}</div>
                </div>

                {currentUser && currentUser._id === com.user?.id && (
                <button onClick={() => handleDelete(com._id)} className='deletebtn'>Delete</button>
                )}
            </div>
            ))}
            {/* {getcomments.map((getcom) => (
               <div key={getcom._id} className='comment-display-section'>
                <div className='user-comment'>
                <div className='name-time'>
                    {getcom.user?.username}&nbsp;
                    <span className='time'><small>{new Date(getcom.createdAt).toLocaleString()}</small></span>
                </div>
                <div>{getcom.comment}</div>
                </div>
            </div> 
            ))} */}

        </div>
        </div>
    </div>
  )
}

export default Comments 
