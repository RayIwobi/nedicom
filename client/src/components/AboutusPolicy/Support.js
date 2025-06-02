import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './aboutpolicy.css'



//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Support() {
  const [ userenquiry, setUserenquiry] = useState("")

  const handlechange = (e) => {
    const {name, value} = e.target;
    setUserenquiry({...userenquiry, [name]: value})
  }

    const form = useRef();
          
            const sendEmail = (e) => {
              e.preventDefault();
          
              emailjs
                .sendForm('service_igxiffd', 'template_npv2rov', form.current, {
                  publicKey: '7mIYr5bdOSAlwj6pH',
                })
                .then(
                  () => {
                    console.log('SUCCESS!');
                  },
                  (error) => {
                    console.log('FAILED...', error.text);
                  },
                );
                toast.success('Enquiries sent');
            };
            

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    
    <hr className='horizontal-rule'/>
    <div className='mainabout-content'>
        
        <div className='aboutus-content'>
            <h3>Need Help?</h3>
            <p> 
                Email: support@nedifoods.co.uk<br/>
                Email: enquiries@nedifoods.co.uk<br/>
                Call: +44 75 8759 5988<br/>
                We’re here to make your shopping easy and convenient!

                <br/>
                <br/>
            </p>
            <h3>Or send us a quick message</h3>
            <div className='enquiries-section'>
              <form ref={form} onSubmit={sendEmail}>
              <label>Name:</label>
              <input required
                  type='text'
                  name="name"
                  value={userenquiry.name}
                  onChange={handlechange}
                  placeholder='Enter your name'
              />
              <label>Phone:</label>
              <input required
                  type='text'
                  name="phone"
                  value={userenquiry.phone}
                  onChange={handlechange}
                  placeholder='Enter your number'
              />
              <label>Email:</label>
              <input required
                type='email'
                name="email"
                value={userenquiry.email}
                onChange={handlechange}
                placeholder='Enter your email'
              />
              <label>Enquiry:</label><br/>
              <textarea required 
                type='text'
                name="message"
                value={userenquiry.message}
                onChange={handlechange}
                placeholder='...add your enquiry or request here'
                id='textarea-support'
              /><br/>
              <input type="submit" value="Send" id="submit"/>
              </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Support
