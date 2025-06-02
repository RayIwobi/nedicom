import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './authentic.css'

// function Dashboard() {

//     const navigate = useNavigate()
//     const [profile, setProfile] = useState("")

//     axios.defaults.withCredentials = true
//      useEffect(() => {
//         axios.get('http://localhost:4000/auth/verify' ,{ withCredentials: true })
//         .then((res) => {
//             if(res.data.status){

//             }
//             else{
//                 navigate('/login') 
//             }
//         })
//     }, [navigate])

//     useEffect(() => {
//       axios.get('http://localhost:4000/auth/dashboard',{ withCredentials: true })
//       .then(res => setProfile(res.data))
//       .catch(err => console.log(err))
//     },[])

//     axios.defaults.withCredentials = true
//   const handleLogout = () => {
//     axios.get('http://localhost:4000/auth/logout')
//     .then(res => {
//       if(res.data.status){
//         navigate('/')
//       }
//       else{}
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//   //order information
//   const [orders, setOrders] = useState([]);
//   const [currentUser, setCurrentUser] = useState("")

//   useEffect(() => {
//     if (!currentUser.email) return;

//     axios.get(`http://localhost:4000/orders/${currentUser.email}`, { withCredentials: true })
//       .then(res => setOrders(res.data))
//       .catch(err => console.error('Error fetching orders:', err));
//   }, [currentUser.email]);

//   return (
//     <div sign-up-container>
//     <div className='dashboard-container'>
//       <div className='dashboard-title'>
//         <h3>Dashboard</h3>
//       <Link to='/'><h2>Return to home</h2></Link>
//       <h2 onClick={handleLogout}>Logout</h2>
//       </div>
      
//       <div className='update-form'>
//         <h3>User Profile</h3>
//         <hr className='hr'/>
         
//          <div className='user-details'>
//             <div><strong>Username:</strong> {profile.username}</div>
//             <div><strong>Email: </strong>{profile.email}</div>
//             <div><strong>Phone number:</strong> {profile.phone}</div>
//             <div><strong>Address:</strong> {profile.address}</div>

//             <Link to='/update-details'><button className='submit-button'>Update details</button></Link>

//             <div className='order-details'>
//               <div>
//                 <div>
//                     <h2>Your Orders</h2>
//                     {orders.length === 0 ? (
//                       <p>No orders yet.</p>
//                     ) : (
//                       orders.map((order) => (
//                         <div key={order._id} className="order">
//                           <p><strong>Order ID:</strong> {order._id}</p>
//                           <p><strong>Total:</strong> ${order.totalAmount}</p>
//                           <p><strong>Items:</strong></p>
//                           <ul>
//                             {order.items.map((item, index) => (
//                               <li key={index}>
//                                 {item.productquantity} × {item.productname} (${item.productprice})
//                               </li>
//                             ))}
//                           </ul>
//                           <hr />
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 <hr/>
//               </div>
//             </div>
//             </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Dashboard



function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate()

      axios.defaults.withCredentials = true
     useEffect(() => {
        axios.get('https://nedifoods-api.vercel.app/auth/verify' ,{ withCredentials: true })
        //axios.get('http://localhost:4000/auth/verify' ,{ withCredentials: true })
        .then((res) => {
            if(res.data.status){

            }
            else{
                navigate('/login') 
            }
        })
    }, [navigate])


  // Step 1: Get the current user
  useEffect(() => {
    axios.get('https://nedifoods-api.vercel.app/auth/dashboard', { withCredentials: true })
    //axios.get('http://localhost:4000/auth/dashboard', { withCredentials: true })
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
  }, []);

  // Step 2: When currentUser is ready, fetch orders
  useEffect(() => {
    if (!currentUser?.email) return;

    axios.get(`https://nedifoods-api.vercel.app/orders/${currentUser.email}`, { withCredentials: true })
    //axios.get(`http://localhost:4000/orders/${currentUser.email}`, { withCredentials: true })
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
  }, [currentUser]);


   axios.defaults.withCredentials = true
    const handleLogout = () => {
      axios.get('https://nedifoods-api.vercel.app/auth/logout' , { withCredentials: true })
      //axios.get('http://localhost:4000/auth/logout')
      .then(res => {
        if(res.data.status){
          navigate('/')
        }
        else{}
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>

      <div className='dashboard-title'>
         <h3>Dashboard</h3>
       <Link to='/'><h2 style={{color:'blue'}}>Return to home</h2></Link>
       <button 
       onClick={handleLogout}
       style={{width:'80px', height:'40px', fontWeight:'600', color:'white', backgroundColor:'black', cursor:'pointer'}}
       >Logout
       </button>
       </div>

      {currentUser ? (
        <>
          <p>Welcome, {currentUser.username}</p><br/>
          <div><strong>Email: </strong>{currentUser.email}</div><br/>
         <div><strong>Phone number:</strong> {currentUser.phone}</div><br/>
          <div><strong>Address:</strong> {currentUser.address}</div><br/>

          <h3>Your Orders:</h3>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.totalAmount}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.productquantity} × {item.productname} (${item.productprice})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
