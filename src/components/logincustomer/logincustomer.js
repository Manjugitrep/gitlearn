import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCustomer from "../../services/AuthCustomer";
import "./LoginCustomer.css"; // Import CSS for styling

const LoginCustomer = () => {
    const [data, setData] = useState({
        customerUsername: "",
        customerPassword: ""
    });

    const [errors, setErrors] = useState({
        customerUsername: "",
        customerPassword: "",
        general: ""
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });

        setErrors({
            ...errors,
            [event.target.name]: "",
            general: ""
        });
    };

    const validate = async () => {
        let fieldErrors = {};
        let isValid = true;

        if (!data.customerUsername) {
            fieldErrors.customerUsername = "Username is required.";
            isValid = false;
        } else if (data.customerUsername.length <= 4) {
            fieldErrors.customerUsername = "Username must be greater than 4 characters.";
            isValid = false;
        }

        if (!data.customerPassword) {
            fieldErrors.customerPassword = "Password is required.";
            isValid = false;
        }

        if (!isValid) {
            setErrors({ ...fieldErrors });
            return;
        }

        try {
            const customerDetails = await AuthCustomer.customerlogin(data.customerUsername, data.customerPassword);

            if (customerDetails && customerDetails.customerId) {
                localStorage.setItem("customerId", customerDetails.customerId);
                localStorage.setItem("customerUsername", customerDetails.customerUsername);
                navigate("/customerMenu");
            } else {
                setErrors({ general: "Invalid credentials. Please try again." });
            }
        } catch (error) {
            setErrors({
                ...fieldErrors,
                general: error.message || "Login failed. Please check your credentials."
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="form-title">Customer Login</h2>
                <form>
                    {errors.general && (
                        <p className="error-message">{errors.general}</p>
                    )}
                    <div className="input-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="customerUsername"
                            className="form-input"
                            value={data.customerUsername}
                            onChange={handleChange}
                        />
                        {errors.customerUsername && <p className="error-message">{errors.customerUsername}</p>}
                    </div>

                    <div className="input-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="customerPassword"
                            className="form-input"
                            value={data.customerPassword}
                            onChange={handleChange}
                        />
                        {errors.customerPassword && <p className="error-message">{errors.customerPassword}</p>}
                    </div>

                    <div className="forgot-password-container">
                        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
                            Forgot Password?
                        </p>
                    </div>

                    <button type="button" className="login-button" onClick={validate}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginCustomer;
