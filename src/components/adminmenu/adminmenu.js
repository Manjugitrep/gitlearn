import React, {Component} from 'react';
import axios from 'axios';
import {
  Link
}from "react-router-dom"
import { withRouter } from '../../withRouter';

const AdminMenu =  () =>{
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
      <br/><br/><hr/>
    </div>
  )
}
export default withRouter(AdminMenu);