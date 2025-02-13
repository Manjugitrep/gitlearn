import React, {Component} from 'react';
import axios from 'axios';
import {
  Link
}from "react-router-dom"
import { withRouter } from '../../withRouter';

const ChartMenu =  () =>{
  return (
    <div class="component-chartmenu">
       <Link to="/locationticketchart"><button className="chartmenu-btn">Location VS Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/cityticketchart"><button className="chartmenu-btn">CustomersCity VS Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/domainticketcharts"><button className="chartmenu-btn">Domain VS Tickets</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/ticketstatuschart"><button className="chartmenu-btn">Tickets Vs Status</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/employeeavgresponsechart"><button className="chartmenu-btn">Average ResponseTime</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/employeeavgresolutionchart"><button className="chartmenu-btn">Average ResolutionTime</button></Link>
      <br/><br/><hr/>
    </div>
  )
}
export default withRouter(ChartMenu);