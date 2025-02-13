import React from "react";
import HomePage from "../homepage/homepage";
import "./aboutUs.css"; // Importing regular CSS file


const AboutUs = () => {
  return (
    <div className='aboutContainer'>
      <HomePage />
      <h1>About Us</h1>
      <p>
        SwiftConnect Networks is a leading broadband and internet service provider, dedicated to delivering high-speed, reliable connectivity to homes and businesses.
      </p>

      <h2>Our Services</h2>
      <ul>
        <li>Fiber Optic Broadband</li>
        <li>Wireless Internet Solutions</li>
        <li>Business Connectivity Services</li>
        <li>24/7 Customer Support</li>
      </ul>

      <h2>Technologies We Use</h2>
      <ul>
        <li>Fiber-to-the-Home (FTTH)</li>
        <li>5G and LTE Wireless Solutions</li>
        <li>AI-Driven Network Management</li>
        <li>Cloud Computing & Edge Technology</li>
      </ul>

      <h2>Contact Us</h2>
      <div className='contactInfo'>
        <p>📍 1234 SwiftConnect Towers, Tech City, USA</p>
        <p>📞 +1-800-123-4567</p>
        <p>📧 support@swiftconnect.com</p>
        <p>🌐 www.swiftconnect.com</p>
      </div>
    </div>
  );
};

export default AboutUs;
