import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthCustomer from "../../services/AuthCustomer";

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

    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate();

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
                localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
                console.log("Customer details logged in: ", customerDetails);
                
                setLoginFailed(false);
                navigate("/customerMenu");
            } else {
                setLoginFailed(true);
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
        <div className="form-container">
            <h2 className="form-title">Welcome</h2>
            <form>
                <table className="form-table">
                    <tbody>
                        {errors.general && (
                            <tr>
                                <td colSpan="2">
                                    <p className="error-message" style={{ color: "red", textAlign: "center" }}>
                                        {errors.general}
                                    </p>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td><label className="form-label">Username:</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="customerUsername"
                                    className="form-input"
                                    value={data.customerUsername}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        {errors.customerUsername && (
                            <tr>
                                <td></td>
                                <td>
                                    <p className="error-message" style={{ color: "red" }}>
                                        {errors.customerUsername}
                                    </p>
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td><label className="form-label">Password:</label></td>
                            <td>
                                <input
                                    type="password"
                                    name="customerPassword"
                                    className="form-input"
                                    value={data.customerPassword}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        {errors.customerPassword && (
                            <tr>
                                <td></td>
                                <td>
                                    <p className="error-message" style={{ color: "red" }}>
                                        {errors.customerPassword}
                                    </p>
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td colSpan="2" align="center">
                                <input
                                    type="button"
                                    className="submit-button"
                                    value="Login"
                                    onClick={validate}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {/* Conditionally render the Forgot Password link only when login fails */}
          {loginFailed && (
                <div>
                    <Link to="../forgotpasswordcustomer">Forgot Password?</Link>
                </div>
            )}
        </div>
    );
};

export default LoginCustomer;
