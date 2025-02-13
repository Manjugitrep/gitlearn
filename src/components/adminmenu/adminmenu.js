import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {
  Link,
  useNavigate
}from "react-router-dom"
import { withRouter } from '../../withRouter';

const AdminMenu =  () =>{

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in and has a valid session
    const loginTime = localStorage.getItem('loginTime');
    const sessionDuration = 8 * 60 * 60 * 1000; // 70 seconds for demonstration
 
    if (loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      if (timeElapsed >= sessionDuration) {
        alert('Session expired. Please log in again.');
        localStorage.clear(); // Clear session data
        navigate('/employeeLogin');
      } else {
        // Set a timer to check session expiration
        setTimeout(() => {
          alert('Session expired. Please log in again.');
          localStorage.clear(); // Clear session data
          navigate('/employeeLogin');
        }, sessionDuration - timeElapsed);
      }
    }
  }, [navigate]);
 
  localStorage.setItem('loginTime', Date.now()); // Store login time
 
  const handleLogout = () => {
    localStorage.clear(); // Remove stored employee ID
    navigate("/employeeLogin"); // Redirect to login page
  };

  return (
    <div class="component-adminmenu">
      <Link to="/employeeInfo"><button class='customerMenu-btn'>My Info</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/employeeTickets"><button class='customerMenu-btn'>Tickets</button></Link> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/showEmployee"><button class='customerMenu-btn'>Admin-Employee List</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/showCustomer"><button class='customerMenu-btn'>Admin-Customer List</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/addEmployee"><button class='customerMenu-btn'>Admin-Add Employee</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/showTicket"><button class='customerMenu-btn'>Admin-Show Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <Link to="/showResolve"><button class='customerMenu-btn'>Admin-Resolved Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/outageLocations"><button class='employeeMenu-btn'>Admin-Outage Map</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/chartMenu"><button class='employeeMenu-btn'>Chart Menu</button></Link>
      <br/><br/><hr/>
    </div>
  )
}
export default withRouter(AdminMenu);