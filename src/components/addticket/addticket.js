// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CustomerMenu from "../customermenu/customermenu";
// import "./addticket.css";

// const AddTicket = () => {
//   const navigate = useNavigate();
//   const [ticket, setTicket] = useState({
//     customerId: "", // Fetched from login
//     employeeId: "", // Manually entered (temporary)
//     ticketType: "",
//     ticketDescription: "",
//     ticketRaiseDate: new Date().toISOString().slice(0, 19),
// // Auto-filled with today's date
//     ticketStatus: "PENDING",
//     ticketPriority: "",
//   });

//   useEffect(() => {
//     // Fetch customerId from login session (localStorage)
//     const storedCustomerId = localStorage.getItem("customerId");
//     if (storedCustomerId) {
//       setTicket((prevTicket) => ({
//         ...prevTicket,
//         customerId: storedCustomerId,
//       }));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTicket({ ...ticket, [name]: value });
//   };

//   const determinePriority = (type) => {
//     switch (type.toLowerCase()) {
//       case "outage":
//         return "HIGH";
//       case "billing":
//         return "LOW";
//       case "service":
//       case "technical":
//       case "complaint":
//         return "MEDIUM";
//       default:
//         return "LOW";
//     }
//   };

//   const addTicket = () => {
//     if (!ticket.ticketType || !ticket.ticketDescription || !ticket.employeeId) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const assignedPriority = determinePriority(ticket.ticketType);
//     const updatedTicket = { ...ticket, ticketPriority: assignedPriority };

//     axios
//       .post("http://localhost:9829/ticket/addTicket", updatedTicket, {
//         headers: { "Content-Type": "application/json" },
//       })
//       .then(() => {
//         alert("Ticket successfully raised!");
//         navigate("/customerTickets");
//       })
//       .catch((error) => {
//         console.error("Error adding ticket:", error);
//         alert(`Error: ${error.response?.data?.message || "Failed to submit ticket."}`);
//       });
//   };

//   return (
//     <div className="component-addTicket">
//       <CustomerMenu/>
//       <table border="3" align="center">
//         <thead>
//           <tr>
//             <th colSpan="2">Raise a New Ticket</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th>Customer ID</th>
//             <td>
//               <input type="text" name="customerId" value={ticket.customerId} readOnly />
//             </td>
//           </tr>
//           <tr>
//             <th>Employee ID</th>
//             <td>
//               <input type="text" name="employeeId" value={ticket.employeeId} onChange={handleInputChange} required />
//             </td>
//           </tr>
//           <tr>
//             <th>Issue Type</th>
//             <td>
//               <select name="ticketType" value={ticket.ticketType} onChange={handleInputChange} required>
//                 <option value="">Select</option>
//                 <option value="Service">Service</option>
//                 <option value="Technical">Technical</option>
//                 <option value="Billing">Billing</option>
//                 <option value="Complaint">Complaint</option>
//                 <option value="Feedback">Feedback</option>
//                 <option value="Outage">Outage</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <th>Description</th>
//             <td>
//               <textarea name="ticketDescription" value={ticket.ticketDescription} onChange={handleInputChange} required />
//             </td>
//           </tr>
//           <tr>
//             <th>Priority (Auto-Assigned)</th>
//             <td>
//               <input type="text" value={determinePriority(ticket.ticketType)} readOnly />
//             </td>
//           </tr>
//           <tr>
//             <th>Ticket Raise Date</th>
//             <td>
//               <input type="text" name="ticketRaiseDate" value={ticket.ticketRaiseDate} readOnly />
//             </td>
//           </tr>
//           <tr>
//             <th colSpan="2">
//               <button onClick={addTicket}>Submit Ticket</button>
//             </th>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddTicket;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerMenu from "../customermenu/customermenu";
import "./addticket.css";

const AddTicket = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    customerId: "",
    employeeId: "",
    ticketType: "",
    ticketDescription: "",
    ticketRaiseDate: new Date().toISOString().slice(0, 19),
    ticketStatus: "PENDING",
    ticketPriority: "",
  });

  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setTicket((prevTicket) => ({
        ...prevTicket,
        customerId: storedCustomerId,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const determinePriority = (type) => {
    switch (type.toLowerCase()) {
      case "outage":
        return "HIGH";
      case "billing":
        return "LOW";
      case "service":
      case "technical":
      case "complaint":
        return "MEDIUM";
      default:
        return "LOW";
    }
  };

  const addTicket = () => {
    if (!ticket.ticketType || !ticket.ticketDescription || !ticket.employeeId) {
      alert("Please fill in all required fields.");
      return;
    }

    const assignedPriority = determinePriority(ticket.ticketType);
    const updatedTicket = { ...ticket, ticketPriority: assignedPriority };

    axios
      .post("http://localhost:9829/ticket/addTicket", updatedTicket, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        alert("Ticket successfully raised!");
        navigate("/customerTickets");
      })
      .catch((error) => {
        console.error("Error adding ticket:", error);
        alert(`Error: ${error.response?.data?.message || "Failed to submit ticket."}`);
      });
  };

  return (
    <div>
      <CustomerMenu />
      <div className="component-addTicket">
        <div className="ticket-form">
          <h2>Raise a New Ticket</h2>

          <div className="form-group">
            {/* <label>Customer ID</label> */}
            {/* <input type="text" name="customerId" value={ticket.customerId} readOnly /> */}
            <input type="hidden" name="customerId" value={ticket.customerId} readOnly />
          </div>

          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" name="employeeId" value={ticket.employeeId} onChange={handleInputChange} required />
            {/* <input type="hidden" name="employeeId" value={ticket.employeeId} onChange={handleInputChange} required /> */}

          </div>

          <div className="form-group">
            <label>Issue Type</label>
            <select name="ticketType" value={ticket.ticketType} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="Service">Service</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
              <option value="Outage">Outage</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="ticketDescription" value={ticket.ticketDescription} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            {/* <label>Priority (Auto-Assigned)</label> */}
            {/* <input type="text" value={determinePriority(ticket.ticketType)} readOnly /> */}
            <input type="hidden" value={determinePriority(ticket.ticketType)} readOnly />
          </div>

          <div className="form-group">
            <label>Ticket Raise Date</label>
            <input type="text" name="ticketRaiseDate" value={ticket.ticketRaiseDate} readOnly />
          </div>

          <button className="submit-button" onClick={addTicket}>
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;

