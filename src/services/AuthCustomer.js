import axios from "axios";

const API_URL = "http://localhost:9829/customer/";

class AuthCustomer {
    async customerlogin(customerUsername, customerPassword) {
        try {
            const response = await axios.get(API_URL + `customerLogin/${customerUsername}/${customerPassword}`);
            return response.data; // Return the customer object directly
        } catch (error) {
            console.error("Login error", error);
            return null; // Return null if login fails
        }
    }

    async getCustomerByUsername(customerUsername) {
        try {
            const response = await axios.get(API_URL + `getCustomerByUsername/${customerUsername}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching customer details", error);
            return null;
        }
    }

    register(customerFirstname, customerLastname, customerAddress, customerPincode, customerCity, customerState,
        customerGender, customerUsername, customerPassword, customerEmail, customerPhno) {
        return axios.post(API_URL + "addCustomer", {
            customerFirstname,
            customerLastname,
            customerAddress,
            customerPincode,
            customerCity,
            customerState,
            customerGender,
            customerUsername,
            customerPassword,
            customerEmail,
            customerPhno
        })
        .then(response => response.data) // Return data directly
        .catch(error => {
            console.error("Registration Error:", error);
            throw error; // Ensure error is caught in `show()` method
        });
    }
    
}

export default new AuthCustomer();
