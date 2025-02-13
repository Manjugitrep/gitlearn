import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../withRouter"

const HomePage = () => {
  return (
    <div className="component-homepage">
      <h1>Welcome to Home Page</h1>
      <Link to="/customerLogin"><button class='homepage-btn'>Customer Login</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/employeeLogin"><button class='homepage-btn'>Employee Login</button></Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/aboutUs"><button class='homepage-btn'>About Us</button></Link>
    </div>
  );
};

export default withRouter(HomePage);