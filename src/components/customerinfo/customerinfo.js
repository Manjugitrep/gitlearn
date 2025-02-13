import React, { useEffect, useState } from "react";
import { withRouter } from "../../withRouter";
import axios from "axios";
import CustomerMenu from "../customermenu/customermenu";
import { useNavigate } from "react-router-dom";

const CustomerInfo = () => {
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("cuser");
    const cId = localStorage.getItem("customerId");

    // if (!user) {
    //   console.error("No user found in localStorage");
    //   return;
    // }

    axios.get("http://localhost:9829/customer/searchCustomer/" + cId )
    .then((response) => {
        setCustomer(response.data);
        localStorage.setItem("customerId", response.data.customerId);
        // alert(response.data.customerId);
    })
    .catch((error) => {
        console.error("Error fetching customer data:", error);
      })
  }, []);

  return (
    <div>
      <CustomerMenu />
      <table border="3" align="center">
        <thead>
          <tr>
            <th colSpan="11">Customer Info</th>
          </tr>
          <tr>
            <th>Customer Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>City</th>
            <th>State</th>
            <th>Gender</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone No.</th>
          </tr>
        </thead>
        <tbody>
          {customer ? (
            <tr>
              <td>{customer.customerId}</td>
              <td>{customer.customerFirstname}</td>
              <td>{customer.customerLastname}</td>
              <td>{customer.customerAddress}</td>
              <td>{customer.customerPincode}</td>
              <td>{customer.customerCity}</td>
              <td>{customer.customerState}</td>
              <td>{customer.customerGender}</td>
              <td>{customer.customerUsername}</td>
              <td>{customer.customerEmail}</td>
              <td>{customer.customerPhno}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="11">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/updateCustomer", { state: { customer } })}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default withRouter(CustomerInfo);
