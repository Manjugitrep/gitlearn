// import React, {Component} from 'react';
// import axios from 'axios';
// import {Link}from "react-router-dom"
// import { withRouter } from '../../withRouter';
// import "./EmployeeMenu.css"
// const EmployeeMenu =  () =>{
//   return (
//     // <div>
//     // {/* Header */}
//     // <header className="employee-header">
//     //   <h1>Employee Dashboard</h1>
//     // </header>
//     // <div class="component-employeemenu">
//     //   <Link to="/employeeInfo"><button class='employeeMenu-btn'>My Info</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   <Link to="/employeeTickets"><button class='employeeMenu-btn'>Tickets</button></Link> 
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   {/* <Link to="/showEmployee"><button class='customerMenu-btn'>Admin-Employee List</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   <Link to="/showCustomer"><button class='customerMenu-btn'>Admin-Customer List</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   <Link to="/addEmployee"><button class='customerMenu-btn'>Admin-Add Employee</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   <Link to="/showTicket"><button class='customerMenu-btn'>Admin-Show Tickets</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
//     //   <Link to="/showResolve"><button class='customerMenu-btn'>Admin-Resolved Tickets</button></Link>
//     //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     //   <br/><br/><hr/> */}
//     // </div>
//     // </div>
//     <div>
//     {/* Header */}
//     <header className="employee-header">
//       <h1>Employee Dashboard</h1>
//     </header>

//     {/* Navigation Menu */}
//     <nav className="employee-menu">
//       <Link to="/employeeInfo">
//         <button className="employee-menu-btn">My Info</button>
//       </Link>
//       <Link to="/employeeTickets">
//         <button className="employee-menu-btn">Tickets</button>
//       </Link>
//       <Link to="/performanceMetrics">
//         <button className="employee-menu-btn">Performance</button>
//       </Link>
//       <Link to="/serviceOutages">
//         <button className="employee-menu-btn">Outages</button>
//       </Link>
//       <Link to="/customerSearch">
//         <button className="employee-menu-btn">Search Customers</button>
//       </Link>
//     </nav>
//   </div>
//   )
// }
// export default withRouter(EmployeeMenu);


//--------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../withRouter';
import './../customermenu/customermenu.css'; // Importing the same CSS for shared styles

const EmployeeMenu = () => {
  const [employee, setEmployee] = useState(null);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      axios.get(`http://localhost:9829/employee/searchEmployee/${employeeId}`)
     
        .then(response => {
          setEmployee(response.data);
        })
        .catch(error => {
          console.error("Error fetching employee details", error);
        });
    }
  }, [employeeId]);
  
  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    window.location.href = "/employeeLogin";
  };

  return (
    <div className="customer-menu-container">
      {/* Header Section */}
      <header className="customer-header">
        <div className="customer-info">
          <img src="/images/user-icon.png" alt="User Icon" className="user-icon" />
          <div className="user-details">
            <span className="user-name">
              {employee?.employeeFirstName ? `${employee.employeeFirstName} ${employee.employeeLastName}` : "Loading..."}
            </span>
            <span className="user-location">
            {employee?.employeeDesignation || "Designation"}
            </span>
          </div>
        </div>
        <h1 className="welcome-text">Employee Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      {/* Main Content Section */}
      <div className="main-content-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul>
            <li><Link to="/employeeInfo"><button className="menu-btn">My Info</button></Link></li>
            <li><Link to="/employeeTickets"><button className="menu-btn">Tickets</button></Link></li>
            <li><Link to="/performanceMetrics"><button className="menu-btn">Performance</button></Link></li>
            <li><Link to="/serviceOutages"><button className="menu-btn">Service Outages</button></Link></li>
            <li><Link to="/customerSearch"><button className="menu-btn">Search Customers</button></Link></li>
          </ul>
        </nav>

        {/* Main Section to display content based on selected menu option */}
        <div className="main-section">
          <Routes>
            <Route path="/employeeInfo" element={<div>Employee Info Content</div>} />
            <Route path="/employeeTickets" element={<div>Employee Tickets Content</div>} />
            <Route path="/performanceMetrics" element={<div>Performance Metrics Content</div>} />
            <Route path="/serviceOutages" element={<div>Service Outages Content</div>} />
            <Route path="/customerSearch" element={<div>Search Customers Content</div>} />
          </Routes>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="customer-footer">
        <p>© 2025 Employee Dashboard</p>
      </footer>
    </div>
  );
};

export default withRouter(EmployeeMenu);

