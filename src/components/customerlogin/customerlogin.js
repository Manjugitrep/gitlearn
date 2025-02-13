import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginCustomer from "../logincustomer/logincustomer";
import RegisterCustomer from "../registercustomer/registercustomer";

import '../employeelogin/employeelogin.css';

// Add custom CSS for styling 
//./components/employeelogin/employeelogin.css
const CustomerLogin = () => {
    const [view, setView] = useState('login'); // State to manage which view to display
    const navigate = useNavigate();
 
    const handleLogin = () => {
        setView('login'); // Switch to login view
    }
 
    const handleSignUp = () => {
        setView('signup'); // Switch to signup view
    }
 
    return (
        <div className="customer-login-container">
            {/* <div className="login-header">
                <h2>Customer Login</h2>
            </div> */}
 
            <div className="form-container">
                {/* Conditionally render the login or signup form based on the state */}
                {view === 'login' && <LoginCustomer />}
                {view === 'signup' && <RegisterCustomer />}
               
                <div className="login-footer">
                    {/* If in signup view, show a link to switch to login */}
                    {view === 'signup' && (
                        <p>Already have an account? <span onClick={handleLogin}>Login here</span></p>
                    )}
                    {/* If in login view, show a link to switch to signup */}
                    {view === 'login' && (
                        <p>Don't have an account? <span onClick={handleSignUp}>Sign Up here</span></p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default CustomerLogin;