// import React from "react";
// import { Link } from "react-router-dom";
// import { withRouter } from "../../withRouter"

// const HomePage = () => {
//   return (
//     <div className="component-homepage">
//       <h1>Welcome to Home Page</h1>
//       <Link to="/customerLogin"><button class='homepage-btn'>Customer Login</button></Link>
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <Link to="/employeeLogin"><button class='homepage-btn'>Employee Login</button></Link>
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <Link to="/aboutUs"><button class='homepage-btn'>About Us</button></Link>
//     </div>
//   );
// };


//export default withRouter(HomePage);

// import React from "react";
// import { Link } from "react-router-dom";
// import "./homepage.css";


// function HomePage() {
//   return (
//     <div className="home-container">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <h1>Customer Service Management</h1>
//         <div>
          
//           <Link to="/customerLogin">Customer Login</Link>
//           <Link to="/employeeLogin">Employee Login</Link>
//           {/* <Link to="/adminMenu">Admin</Link> */}
//           <Link to="/aboutUs">About Us</Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero">
//         <h2>Welcome to Customer Service Management</h2>
//         <p>Effortlessly manage your service requests and get real-time assistance.</p>
//         <div className="hero-buttons">
//           <Link to="/customerLogin" className="btn">Customer Login</Link>
//           <Link to="/employeeLogin" className="btn">Employee Login</Link>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="features">
//         <div className="feature-card">
//           <h3>Raise a Ticket</h3>
//           <p>Submit service requests and track progress.</p>
//         </div>
//         <div className="feature-card">
//           <h3>Manage Queries</h3>
//           <p>Employees can resolve customer queries efficiently.</p>
//         </div>
//         <div className="feature-card">
//           <h3>Admin Controls</h3>
//           <p>Admins can oversee operations and user management.</p>
//         </div>
//         <div className="feature-card">
//           <h3>Live Chat Assistance</h3>
//           <p>Get real-time help from our AI chatbot.</p>
//         </div>
//       </section>

//       {/* About Us */}
//       <section className="about-us">
//         <h2>About Us</h2>
//         <p>We are dedicated to providing seamless customer service solutions...</p>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© 2025 Customer Service Management. All rights reserved.</p>
//         <p>Contact: support@example.com | +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; // Ensure the filename matches the import

function HomePage() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1>Customer Service Management</h1>
        <div className="nav-links">
          
          <Link to="/customerLogin">Customer Login</Link>
          {/* <Link to="/customerLogin">Customer Login</Link> */}
          <Link to="/employeeLogin">Employee Login</Link>
          {/* <Link to="/adminMenu">Admin</Link> */}
          <Link to="/aboutUs">About Us</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h2>Welcome to Customer Service Management</h2>
        <p>Effortlessly manage your service requests and get real-time assistance.</p>
        <div className="hero-buttons">
          {/* <Link to="/customerLogin" className="btn">Customer Login</Link> */}
          <Link to="/customerLogin" className="btn">Customer Login</Link>
          <Link to="/employeeLogin" className="btn">Employee Login</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <img src="/images/ticket.jpg" alt="Raise Ticket" />
          <h3>Raise a Ticket</h3>
          <p>Submit service requests and track progress.</p>
        </div>
        <div className="feature-card">
          <img src="/images/manage.png" alt="Manage Queries" />
          <h3>Manage Queries</h3>
          <p>Employees can resolve customer queries efficiently.</p>
        </div>
        <div className="feature-card">
          <img src="/images/admin.png" alt="Admin Control" />
          <h3>Admin Controls</h3>
          <p>Admins can oversee operations and user management.</p>
        </div>
        <div className="feature-card">
          <img src="/images/chatbot.png" alt="Live Chat" />
          <h3>InfoBot</h3>
          <p>Get real-time help from our  chatbot.</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We provide seamless customer service solutions...</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Customer Service Management. All rights reserved.</p>
        <p>Contact: support@example.com | +1 234 567 890</p>
      </footer>
    </div>
  );
}

//export default HomePage;


export default HomePage;
