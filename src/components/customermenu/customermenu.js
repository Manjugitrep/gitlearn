// import React, {Component, useEffect, useState} from 'react';
// import axios from 'axios';
// import { Link}from "react-router-dom"
// import { withRouter } from '../../withRouter';
// // import AuthCustomer from '../../services/AuthCustomer';

// const CustomerMenu =  () =>{

// //   const [customer, setCustomer] = useState(null);
//   const customerId = localStorage.getItem("customerId");

// //   useEffect(() => {
// //     const customerId = localStorage.getItem("customerId");
// //     if (customerId) {
// //         AuthCustomer.getCustomerById(customerId)
// //             .then(response => {
// //                 setCustomer(response.data);
// //             })
// //             .catch(error => {
// //                 console.error("Error fetching customer details", error);
// //             });
// //     }
// // }, []);
//   return (
//     <div class="component-customermenu">
//       <h1>Welcome {customerId}</h1>
//       <Link to="/CustomerInfo"><button class='customerMenu-btn'>My Info</button></Link>
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <Link to="/customerTickets"><button class='customerMenu-btn'>My Tickets</button></Link>
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <Link to="/addTicket"><button class='customerMenu-btn'>Add Ticket</button></Link>
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <Link to="/chatbot"><button class='customerMenu-btn'>Chatbot</button></Link> <br/> <br/> <hr/>
//     </div>
//   )
// }
// export default withRouter(CustomerMenu);

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { withRouter } from '../../withRouter';
// import './customermenu.css'; 
// // import AuthCustomer from '../../services/AuthCustomer';

// const CustomerMenu = () => {
//   const [customer, setCustomer] = useState(null);
//   const customerId = localStorage.getItem("customerId");

//   useEffect(() => {
//     if (customerId) {
//       // Uncomment this part to fetch customer details
//       // AuthCustomer.getCustomerById(customerId)
//       //   .then(response => {
//       //     setCustomer(response.data);
//       //   })
//       //   .catch(error => {
//       //     console.error("Error fetching customer details", error);
//       //   });
      
//       // Temporary mock data for testing
//       setCustomer({ username: "JohnDoe" });  // Replace with real API data
//     }
//   }, [customerId]);

//   return (
//     <div className="customer-menu">
//       <h1>Welcome {customer ? customer.username : customerId}</h1>
//       <div className="menu-buttons">
//         <Link to="/CustomerInfo">
//           <button className="customer-menu-btn">My Info</button>
//         </Link>
//         <Link to="/customerTickets">
//           <button className="customer-menu-btn">My Tickets</button>
//         </Link>
//         <Link to="/addTicket">
//           <button className="customer-menu-btn">Add Ticket</button>
//         </Link>
//         <Link to="/chatbot">
//           <button className="customer-menu-btn">Chatbot</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default withRouter(CustomerMenu);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../withRouter';
import './customermenu.css'; // Import the CSS file for styling
import Chatbot from '../chatbot/chatbot';
//import userIcon from '../../assets/user-icon.png'; // Adjust path as needed


const CustomerMenu = () => {
  const [customer, setCustomer] = useState(null);
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (customerId) {
      axios.get(`http://localhost:9829/customer/searchCustomer/${customerId}`)
        .then(response => {
          console.log("Customer API Response:", response.data);
          setCustomer(response.data);
        })
        .catch(error => {
          console.error("Error fetching customer details", error);
        });
    }
  }, [customerId]);
  const handleLogout = () => {
    localStorage.removeItem("customerId");
    window.location.href = "/customerlogin";
  };
  //const userIcon = "https://via.placeholder.com/50"; // Placeholder image URL

  return (
    <div className="customer-menu-container">
      {/* Header Section */}
      {/* <header className="customer-header">
        <h1>Welcome, {customer ? customer.username : "Customer"}</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header> */}
      {/* Header Section */}
      <header className="customer-header">
        <div className="customer-info">
        <img src="/images/user-icon.png" alt="User Icon" />
          <div className="user-details">
          <span className="user-name">
      {customer?.customerFirstname ? `${customer.customerFirstname} ${customer.customerLastname}` : "Loading..."}
    </span>
    <span className="user-location">
      {customer?.customerCity && customer?.customerState ? `${customer.customerCity}, ${customer.customerState}` : "City, State"}
    </span>
          </div>
        </div>
        <h1 className="welcome-text">Welcome ,Mr. {customer ? customer.customerFirstname : "Customer"}</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      {/* Main Content Section */}
      <div className="main-content-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul>
            <li><Link to="/customerInfo"><button className="menu-btn">My Info</button></Link></li>
            <li><Link to="/customerTickets"><button className="menu-btn">My Tickets</button></Link></li>
            <li><Link to="/addTicket"><button className="menu-btn">Add Ticket</button></Link></li>
            <li><Link to="/services"><button className="menu-btn">View Services</button></Link></li>
            <li><Link to="/aboutus"><button className="menu-btn">About Us</button></Link></li>
            {/* <li><Link to="/chatbot"><button className="menu-btn">Chatbot</button></Link></li>*/}
          </ul> 
        </nav>

        {/* Main Section to display the content of selected menu option */}
        <div className="main-section">
          <Routes>
            <Route path="/customerInfo" element={<div>Customer Info Content</div>} />
            <Route path="/customerTickets" element={<div>Customer Tickets Content</div>} />
            <Route path="/addTicket" element={<div>Add Ticket Content</div>} />
            <Route path="/services" element={<div>Service Offerings Content</div>} />
            <Route path="/aboutus" element={<div>About Us Content</div>} />
            {/* <Route path="/chatbot" element={<div>Chatbot Content</div>} /> */}
          </Routes>
          <Chatbot/>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="customer-footer">
        <p>© 2025 Customer Service Management Dashboard</p>
      </footer>
    </div>
  );
};

export default withRouter(CustomerMenu);
