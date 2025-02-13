import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
 
const ForgotPasswordcustomer = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email Input, Step 2: OTP Verification
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
 
  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };
 
  // Step 1: Request OTP
  // Step 1: Request OTP
const handleRequestOtp = async () => {
  try {
    alert(email);
    // Change from GET to POST, and pass the email in the request body
    const response = await axios.post("http://localhost:9829/customer/forgotpassword", null, {
      params: { email: email }, // Sending email as a parameter
    });
 
    if (response.status === 200) {
      setMessage("OTP has been sent to your email. Please check your inbox.");
      setStep(2); // Move to OTP Verification step
    }
  } catch (error) {
    setError("Email not found. Please enter a registered email.");
  }
};
 
 
  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
 
    try {
      const response = await axios.post("http://localhost:9829/customer/validateotp", null, {
        params: { email, otp },
      });
 
      if (response.status === 200) {
        setMessage("OTP verified successfully!");
        alert("OTP Verified! Redirecting to Reset Password...");
        navigate("/resetpasswordcustomer", { state: { email } });
      }
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };
 
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
 
      {step === 1 && (
        <>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your registered email"
            autoFocus
          />
          <input type="button" value="Request OTP" onClick={handleRequestOtp} />
        </>
      )}
 
      {step === 2 && (
        <>
          <p style={{ color: "green" }}>{message}</p>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            maxLength="6"
          />
          <input type="button" value="Verify OTP" onClick={handleVerifyOtp} />
        </>
      )}
 
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
 
export default ForgotPasswordcustomer;
 