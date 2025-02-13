import React from "react";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutContainer">
      {/* Banner Section */}
      <div className="aboutBanner">
        <h2>About Us</h2>
      </div>

      {/* About Us Content */}
      <div className="aboutUsContent">
        <div>
          <h1>Who We Are</h1>
          <p>
            SwiftConnect Networks is a leading broadband and internet service provider, dedicated to delivering high-speed, reliable connectivity to homes and businesses. Our solutions aim to bridge the digital divide and enhance communication.
          </p>
        </div>
        <div>
          <h1>Our Mission</h1>
          <p>
            Our mission is to bring the most affordable, reliable, and ultra-fast internet service to communities worldwide, while ensuring the highest level of customer satisfaction and support.
          </p>
        </div>
      </div>

      {/* Our Services */}
      <h2>Our Services</h2>
      <div className="cardsSection">
        <div className="card">
          <div className="icon">🌐</div>
          <h3>Fiber Optic Broadband</h3>
          <p>Ultra-fast internet with unmatched reliability and speed for both homes and businesses.</p>
        </div>
        <div className="card">
          <div className="icon">📶</div>
          <h3>Wireless Internet Solutions</h3>
          <p>High-speed wireless connections for areas that need flexible and scalable solutions.</p>
        </div>
        <div className="card">
          <div className="icon">🏢</div>
          <h3>Business Connectivity</h3>
          <p>Customized internet packages and business solutions designed to help you grow.</p>
        </div>
      </div>

      {/* Technologies We Use */}
      <h2>Technologies We Use</h2>
      <div className="cardsSection">
        <div className="card">
          <div className="icon">⚡</div>
          <h3>Fiber-to-the-Home</h3>
          <p>Next-gen fiber optic technology to provide ultra-fast internet directly to homes.</p>
        </div>
        <div className="card">
          <div className="icon">📡</div>
          <h3>5G & LTE</h3>
          <p>Revolutionizing connectivity with high-speed 5G and LTE networks for a seamless experience.</p>
        </div>
        <div className="card">
          <div className="icon">🤖</div>
          <h3>AI-Driven Networks</h3>
          <p>Artificial intelligence optimizes network performance, ensuring reliability and security.</p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="contactInfo">
        <h2>Contact Us</h2>
        <p>📍 1234 SwiftConnect Towers, Tech City, USA</p>
        <p>📞 +1-800-123-4567</p>
        <p>📧 support@swiftconnect.com</p>
        <p>🌐 www.swiftconnect.com</p>
      </div>

      {/* Footer Section */}
      <footer>
        <p>© 2025 SwiftConnect Networks. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
