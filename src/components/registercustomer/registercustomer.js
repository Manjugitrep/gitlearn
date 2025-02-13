import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthCustomer from "../../services/AuthCustomer";
 
const RegisterCustomer = () => {
    const [data, setData] = useState({
        customerFirstname: '',
        customerLastname: '',
        customerAddress:'',
        customerPincode:'',
        customerCity: '',
        customerState: '',
        customerGender: '',
        customerUsername: '',
        customerPassword: '',
        confirmPassword: '',
        customerEmail: '',
        customerPhno: ''
    });
 
    const [errors, setErrors] = useState({
        customerFirstname: '',
        customerLastname: '',
        customerAddress:'',
        customerPincode:'',
        customerCity: '',
        customerState: '',
        customerGender: '',
        customerUsername: '',
        customerPassword: '',
        confirmPassword: '',
        customerEmail: '',
        customerPhno: ''
    });
 
    const [passwordMatch, setPasswordMatch] = useState(false);  // State to handle password match
 
    const navigate = useNavigate();
 
    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        });
    };
 
    const validate = () => {
        let fieldErrors = {};
        let isValid = true;
 
        // Check for empty fields
        for (const field in data) {
            if (data[field] === '') {
                fieldErrors[field] = `${field.replace(/([A-Z])/g, ' $1')}: This field is required.`;
                isValid = false;
            }
        }
 
        // Validate First Name and Last Name (min 4 characters)
        if (data.customerFirstname.length < 4) {
            fieldErrors.customerFirstname = 'First Name must be at least 4 characters.';
            isValid = false;
        }
 
        if (data.customerLastname.length < 4) {
            fieldErrors.customerLastname = 'Last Name must be at least 4 characters.';
            isValid = false;
        }
 
        // Validate Username (at least 4 characters)
        if (data.customerUsername.length < 4) {
            fieldErrors.customerUsername = 'Username must be at least 4 characters.';
            isValid = false;
        }
 
        // Validate Password (at least one uppercase, one special character, and one number)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/;
        if (!passwordRegex.test(data.customerPassword)) {
            fieldErrors.customerPassword = 'Password must contain at least one uppercase letter, one special character, and one number.';
            isValid = false;
        }
 
        // Validate Confirm Password
        if (data.customerPassword !== data.confirmPassword) {
            fieldErrors.confirmPassword = 'Password and Confirm Password do not match.';
            setPasswordMatch(false); // Update password match state
            isValid = false;
        } else {
            setPasswordMatch(true); // Passwords match
        }
 
        // Validate Email (contains @ and ends with @gmail.com or @yahoo.com)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;
        if (!emailRegex.test(data.customerEmail) || !data.customerEmail.endsWith('@gmail.com') && !data.customerEmail.endsWith('@yahoo.com')) {
            fieldErrors.customerEmail = 'Please enter a valid email with @gmail.com or @yahoo.com.';
            isValid = false;
        }
 
        // Validate Phone Number (exactly 10 digits, first digit between 6-9)
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(data.customerPhno)) {
            fieldErrors.customerPhno = 'Phone number should be 10 digits and start with a digit between 6 and 9.';
            isValid = false;
        }
 
        // Validate City and State (make sure they are selected)
        if (data.customerCity === '') {
            fieldErrors.customerCity = 'Please select a city.';
            isValid = false;
        }
 
        if (data.customerState === '') {
            fieldErrors.customerState = 'Please select a state.';
            isValid = false;
        }
 
        setErrors(fieldErrors);  // Set all errors at once
 
        if (isValid) {
            show();  // Proceed to register the customer if everything is valid
        }
    };
 
    const show = () => {
        AuthCustomer.register(
            data.customerFirstname, data.customerLastname, data.customerAddress, data.customerPincode, data.customerState, data.customerCity, 
            data.customerGender, data.customerUsername, data.customerPassword, data.customerEmail, data.customerPhno
        )
        .then(response => {
            alert(response.data);
            navigate("/customerMenu");
        })
        .catch(error => {
            console.error("Error while Register", error);
            alert("Error in registration.");
        });
    };
 
    return (
        <div className="form-container">
            <h2 className="form-title">Register</h2>
            <form>
                {/* First Name */}
                <label className="form-label">First Name:</label>
                <input
                    type="text"
                    name="customerFirstname"
                    className="form-input"
                    value={data.customerFirstname}
                    onChange={handleChange}
                />
                <br />
                {errors.customerFirstname && <p className="error-message" style={{ color: 'red' }}>{errors.customerFirstname}</p>}
 
                {/* Last Name */}
                <label className="form-label">Last Name:</label>
                <input
                    type="text"
                    name="customerLastname"
                    className="form-input"
                    value={data.customerLastname}
                    onChange={handleChange}
                />
                <br />
                {errors.customerLastname && <p className="error-message" style={{ color: 'red' }}>{errors.customerLastname}</p>}

                {/* Address */}
                <label className="form-label">Address:</label>
                <input
                    type="text"
                    name="customerAddress"
                    className="form-input"
                    value={data.customerAddress}
                    onChange={handleChange}
                />
                <br />
                {errors.customerAddress && <p className="error-message" style={{ color: 'red' }}>{errors.customerAddress}</p>}
 

                {/* Pincode */}
                <label className="form-label">Pincode:</label>
                <input
                    type="text"
                    name="customerPincode"
                    className="form-input"
                    value={data.customerPincode}
                    onChange={handleChange}
                />
                <br />
                {errors.customerPincode && <p className="error-message" style={{ color: 'red' }}>{errors.customerPincode}</p>}
 
                {/* State */}
                <label className="form-label">State:</label>
                <select
                    name="customerState"
                    className="form-input"
                    value={data.customerState}
                    onChange={handleChange}
                >
                    <option value="">Select State:</option>
                    <option value="TamilNadu">TamilNadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Telangana">Telangana</option>
                </select>
                <br />
                {errors.customerState && <p className="error-message" style={{ color: 'red' }}>{errors.customerState}</p>}
 
                {/* City */}
                <label className="form-label">City:</label>
                <select
                    name="customerCity"
                    className="form-input"
                    value={data.customerCity}
                    onChange={handleChange}
                >
                    <option value="">Select City</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kochi">Kochi</option>
                </select>
                <br />
                {errors.customerCity && <p className="error-message" style={{ color: 'red' }}>{errors.customerCity}</p>}
 
                {/* Gender */}
                <label className="form-label">Gender:</label>
                <select
                    name="customerGender"
                    className="form-input"
                    value={data.customerGender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <br />
                {errors.customerGender && <p className="error-message" style={{ color: 'red' }}>{errors.customerGender}</p>}
 
                {/* Username */}
                <label className="form-label">Username:</label>
                <input
                    type="text"
                    name="customerUsername"
                    className="form-input"
                    value={data.customerUsername}
                    onChange={handleChange}
                />
                <br />
                {errors.customerUsername && <p className="error-message" style={{ color: 'red' }}>{errors.customerUsername}</p>}
 
                {/* Password */}
                <label className="form-label">Password:</label>
                <input
                    type="password"
                    name="customerPassword"
                    className="form-input"
                    value={data.customerPassword}
                    onChange={handleChange}
                />
                <br />
                {errors.customerPassword && <p className="error-message" style={{ color: 'red' }}>{errors.customerPassword}</p>}
 
                {/* Confirm Password */}
                <label className="form-label">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={data.confirmPassword}
                    onChange={handleChange}
                />
                <br />
                {/* Show Green Tick if Password Matches */}
                {passwordMatch && <span style={{ color: 'green', fontSize: '20px' }}>✅</span>}
                {errors.confirmPassword && <p className="error-message" style={{ color: 'red' }}>{errors.confirmPassword}</p>}
 
                {/* Email */}
                <label className="form-label">Email:</label>
                <input
                    type="email"
                    name="customerEmail"
                    className="form-input"
                    value={data.customerEmail}
                    onChange={handleChange}
                />
                <br />
                {errors.customerEmail && <p className="error-message" style={{ color: 'red' }}>{errors.customerEmail}</p>}
 
                {/* Phone Number */}
                <label className="form-label">Phone Number:</label>
                <input
                    type="text"
                    name="customerPhno"
                    className="form-input"
                    value={data.customerPhno}
                    onChange={handleChange}
                />
                <br />
                {errors.customerPhno && <p className="error-message" style={{ color: 'red' }}>{errors.customerPhno}</p>}
 
                {/* Submit Button */}
                <input
                    type="button"
                    className="submit-button"
                    value="Register"
                    onClick={validate}
                />
            </form>
        </div>
    );
};
 
export default RegisterCustomer;