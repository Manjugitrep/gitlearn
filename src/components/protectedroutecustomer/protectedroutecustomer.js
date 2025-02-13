import React from 'react';
import { Navigate } from 'react-router-dom';
 
// ProtectedRoutecustomer component to handle authorization
const ProtectedRoutecustomer = ({ children }) => {
  const customerId = localStorage.getItem('customerId'); // Check if the customer is logged in by checking the customerId
 
  if (!customerId) {
    alert('You are not authorized! Please log in.'); // Show alert if not logged in
    return <Navigate to="/" replace />; // Redirect to login page if not authorized
  }
 
  return children; // Allow access to the route if the user is logged in
};
 
export default ProtectedRoutecustomer;