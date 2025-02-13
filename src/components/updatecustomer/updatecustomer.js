import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerMenu from "../customermenu/customermenu";

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    customerId: "",
    customerFirstname: "",
    customerLastname: "",
    customerAddress:"",
    customerPincode:"",
    customerCity: "",
    customerState: "",
    customerGender: "",
    customerUsername: "",
    customerEmail: "",
    customerPhNo: "",
  });

  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9829/customer/searchCustomer/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:9829/customer/updateCustomer", customer)
      .then(() => {
        alert("Your details have been modified");
        navigate("/customerInfo");
      })
      .catch((error) => console.error("Error updating customer:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomerMenu />
      <h2 style={{ textAlign: "center" }}>Update Customer Details</h2>
      <table border="2" align="center">
        <tbody>
          <tr>
            <th>Customer Id</th>
            <td><input type="text" name="customerId" value={customer.customerId} readOnly /></td>
          </tr>
          <tr>
            <th>First Name</th>
            <td><input type="text" name="customerFirstname" value={customer.customerFirstname} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td><input type="text" name="customerLastname" value={customer.customerLastname} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Address</th>
            <td><input type="text" name="customerAddress" value={customer.customerAddress} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Pincode</th>
            <td><input type="text" name="customerPincode" value={customer.customerPincode} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>City</th>
            <td><input type="text" name="customerCity" value={customer.customerCity} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>State</th>
            <td><input type="text" name="customerState" value={customer.customerState} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><input type="email" name="customerEmail" value={customer.customerEmail} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Phone No.</th>
            <td><input type="text" name="customerPhNo" value={customer.customerPhNo} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateCustomer;