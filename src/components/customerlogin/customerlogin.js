import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginCustomer from "../logincustomer/logincustomer";
import RegisterCustomer from "../registercustomer/registercustomer";
 
const CustomerLogin = () => {
    const [view, setView] = useState(''); // State to manage which view to display
 
    const customerLogin = () => {
        setView('login'); // Set the view to 'login'
    }
 
    const signUp = () => {
        setView('signup'); // Set the view to 'signup'
    }
 
    return (
        <div className="form-container">
            <form className="form-label">
                <input type="button" className="submit-button" value="Login" onClick={customerLogin} />
                <input type="button" className="submit-button" value="SignUp" onClick={signUp} />
            </form>
 
            {/* Conditionally render the components based on the view state */}
            {view === 'login' && <LoginCustomer />} {/* Render Logincus component */}
            {view === 'signup' && <RegisterCustomer />} {/* Render Customerresgister component */}
        </div>
    )
}
export default CustomerLogin;