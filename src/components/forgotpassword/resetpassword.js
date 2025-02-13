import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
 
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || ""; // Retrieve email from navigation state
 
  const [email, setEmail] = useState(emailFromState);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const handleReset = async () => {
    try {
      const response = await axios.post("http://localhost:9829/employee/resetpassword", null, {
        params: { email, newPassword },
      });
      if (response.status === 200) {
        setMessage("Password reset successfully!");
        alert("Password Reset Successful! Redirecting to Login...");
        navigate("/employeeLogin");
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };
 
  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" value={email} readOnly placeholder="Registered Email" />
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button onClick={handleReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};
 
export default ResetPassword;
 