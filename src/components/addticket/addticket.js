import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerMenu from "../customermenu/customermenu";

const AddTicket = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [ticket, setTicket] = useState({
    customerId: 0, // Fetched from login
    ticketType: "",
    ticketDescription: "",
    ticketRaiseDate: new Date().toISOString().slice(0, 19), // Auto-filled with today's date
    ticketStatus: "PENDING",
    ticketPriority: "",
  });

  useEffect(() => {
    // Fetch customer details from localStorage
    const storedCustomerDetails = JSON.parse(localStorage.getItem("customerDetails"));
    if (storedCustomerDetails) {
      setCustomer(storedCustomerDetails);
      setTicket((prevTicket) => ({
        ...prevTicket,
        customerId: storedCustomerDetails.customerId,
      }));
    }
  }, []);

  // Function to determine priority dynamically based on ticketType
  const determinePriority = (type) => {
    switch (type) {
      case "OUTAGE":
        return "HIGH";
      case "BILLING_AND_ACCOUNTS":
      case "PRODUCT_AND_PLANS":
      case "OTHER":
        return "LOW";
      case "INSTALLATION_AND_SERVICE":
      case "TECHNICAL_SUPPORT":
      case "RELOCATION_REQUEST":
        return "MEDIUM";
      default:
        return "LOW";
    }
  };

  // Update priority when ticketType changes
  useEffect(() => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      ticketPriority: determinePriority(prevTicket.ticketType),
    }));
  }, [ticket.ticketType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const addTicket = () => {
    if (!ticket.ticketType || !ticket.ticketDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    // Make a POST request to add the ticket
    axios.post("http://localhost:9829/ticket/addTicket", {
      ticketType: ticket.ticketType,
      ticketDescription: ticket.ticketDescription,
      customer: {
        customerId: ticket.customerId,
        customerFirstname: customer.customerFirstname,
        customerLastname: customer.customerLastname,
        customerAddress: customer.customerAddress,
        customerPincode: customer.customerPincode,
        customerGender: customer.customerGender,
        customerUsername: customer.customerUsername,
        customerEmail: customer.customerEmail,
        customerPhno: customer.customerPhno,
        customerLatitude: customer.customerLatitude,
        customerLongitude: customer.customerLongitude,
        customerCity: customer.customerCity,
        customerState: customer.customerState
      }
    }).then(function (response) {
      // alert(response.data);
      console.log(response.data);
      navigate("/customerTickets");
    }).catch(function (error) {
      console.error("Error adding ticket:", error);
      alert(`Error: ${error.response?.data?.message || "Failed to submit ticket."}`);
    });
  };

  return (
    <div className="component-addTicket">
      <CustomerMenu />
      <table border="3" align="center">
        <thead>
          <tr>
            <th colSpan="2">Raise a New Ticket</th>
          </tr>
        </thead>
        <tbody>
          {/* Customer ID */}
          <tr>
            <th>Customer ID</th>
            <td>
              <input type="text" name="customerId" value={ticket.customerId} readOnly />
            </td>
          </tr>

          {/* Issue Type */}
          <tr>
            <th>Issue Type</th>
            <td>
              <select name="ticketType" value={ticket.ticketType} onChange={handleInputChange} required>
                <option value="">Select</option>
                <option value="BILLING_AND_ACCOUNTS">BILLING AND ACCOUNTS</option>
                <option value="PRODUCT_AND_PLANS">PRODUCT AND PLANS</option>
                <option value="INSTALLATION_AND_SERVICE">INSTALLATION AND SERVICE</option>
                <option value="RELOCATION_REQUEST">RELOCATION REQUEST</option>
                <option value="TECHNICAL_SUPPORT">TECHNICAL SUPPORT</option>
                <option value="OUTAGE">OUTAGE</option>
              </select>
            </td>
          </tr>

          {/* Ticket Description */}
          <tr>
            <th>Description</th>
            <td>
              <textarea name="ticketDescription" value={ticket.ticketDescription} onChange={handleInputChange} required />
            </td>
          </tr>

          {/* Priority (Auto-Assigned) */}
          <tr>
            <th>Priority (Auto-Assigned)</th>
            <td>
              <input type="text" value={ticket.ticketPriority} readOnly />
            </td>
          </tr>

          {/* Submit Button */}
          <tr>
            <th colSpan="2">
              <button onClick={addTicket}>Submit Ticket</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddTicket;
