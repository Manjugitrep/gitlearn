import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {
  Link,
  useNavigate
}from "react-router-dom"
import { withRouter } from '../../withRouter';
// import AuthCustomer from '../../services/AuthCustomer';

const CustomerMenu =  () =>{

  const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
  const customerId = localStorage.getItem("customerId");

  
  useEffect(() => {
    // Check if the user is already logged in and has a valid session
    const loginTime = localStorage.getItem('loginTime');
    const sessionDuration = 15 * 60 * 1000; // 70 seconds for demonstration
 
    if (loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      if (timeElapsed >= sessionDuration) {
        alert('Session expired. Please log in again.');
        localStorage.clear(); // Clear session data
        navigate('/customerLogin');
      } else {
        // Set a timer to check session expiration
        setTimeout(() => {
          alert('Session expired. Please log in again.');
          localStorage.clear(); // Clear session data
          navigate('/customerLogin');
        }, sessionDuration - timeElapsed);
      }
    }
  }, [navigate]);

  localStorage.setItem('loginTime', Date.now()); // Store login time

  const handleLogout = () => {
    localStorage.clear(); // Remove stored customer ID
    navigate("/customerLogin"); // Redirect to login page
  };

  return (
    <div class="component-customermenu">
      <h1>Welcome {customerId}</h1>
      <Link to="/CustomerInfo"><button class='customerMenu-btn'>My Info</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/customerTickets"><button class='customerMenu-btn'>My Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/addTicket"><button class='customerMenu-btn'>Add Ticket</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/chatbot"><button class='customerMenu-btn'>Chatbot</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button className="customerMenu-btn logout-btn" onClick={handleLogout}>Logout</button>
       <br/> <br/> <hr/>
    </div>
  )
}
export default withRouter(CustomerMenu);