import React from "react";
import { Navigate } from "react-router-dom";
 
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // Check if JWT token exists
  const userRole = localStorage.getItem("designation"); // Get user role from localStorage
//   const customerId = localStorage.getItem("customerId"); // Check if the customer is logged in by checking the customerId
 
  if (!token) {
    alert("You are not authorized! Please log in."); // Show alert
    return <Navigate to="/" replace />; // Redirect to login/home page
  }
 
  if (!userRole || !allowedRoles.includes(userRole)) {
    alert("Access Denied! You do not have permission.");
    return <Navigate to="/" replace />;
  }
 
  return children;
};
 
export default ProtectedRoute;
 