import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from '../../withRouter';
import EmployeeMenu from '../employeemenu/employeemenu';
import './employeetickets.css';

const EmployeeTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    let employeeId = localStorage.getItem("employeeId");
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9829/ticket/searchTicketByEmployeeId/" + employeeId);
      console.log("API Response:", response.data);
      setTickets(response.data);
    };
    fetchData();
  }, []);

  // Handle the ticket update
  const updateTicket = async () => {
    if (selectedTicket) {
      const updatedTicket = {
        ...selectedTicket,
        ticketType,
        ticketStatus,
        ticketPriority
      };
      await axios.put('http://localhost:9829/ticket/updateTicket', updatedTicket);
      alert('Ticket updated successfully!');
      // Fetch updated ticket data after the update
      setTickets(tickets.map(ticket => ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket));
      setSelectedTicket(null);
    }
  };

  // Handle closing the ticket
  const closeTicket = async () => {
    if (selectedTicket) {
      const resolvedTicket = {
        ticketId: selectedTicket.ticketId,
        employeeId: localStorage.getItem("employeeId"),
        resolveDate: new Date().toISOString(),
        employeeDescription: "Ticket closed by employee",
        turnAroundTime: "0", // You can calculate this based on your requirements
        delayReason: "N/A"
      };

      // Adding to resolved table
      await axios.post("http://localhost:9829/resolve/addResolve", resolvedTicket);

      // Update the ticket status to closed
      const updatedTicket = { ...selectedTicket, ticketStatus: "Closed" };
      await axios.put("http://localhost:9829/ticket/updateTicket", updatedTicket);

      // Update state
      setTickets(tickets.map(ticket => ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket));
      alert("Ticket closed and resolved successfully!");
      setSelectedTicket(null);
    }
  };

  //Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentTickets = tickets.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(tickets.length / recordsPerPage);

  const nextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
      }
  };

  const prevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };

  return (
    <div className="component-employeeticket">
      <EmployeeMenu />
      <table border="2" align="center">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Ticket Id</th>
            <th>Employ Id</th>
            <th>Ticket Type</th>
            <th>Ticket Description</th>
            <th>Ticket Raised Date</th>
            <th>Ticket Status</th>
            <th>Ticket Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td>{ticket.customer.customerId}</td>
              <td>{ticket.ticketId}</td>
              <td>{ticket.employeeId}</td>
              <td>{ticket.ticketType}</td>
              <td>{ticket.ticketDescription}</td>
              <td>{ticket.ticketRaiseDate}</td>
              <td>{ticket.ticketStatus}</td>
              <td>{ticket.ticketPriority}</td>
              <td>
                {/* <button onClick={() => setSelectedTicket(ticket)}>Update</button> */}
                <button onClick={() => {
                  setSelectedTicket(ticket);
                  // setTicketType(ticket.ticketType);
                  // setTicketStatus(ticket.ticketStatus);
                  // setTicketPriority(ticket.ticketPriority);
                }}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Update Ticket Form - Shown when a ticket is selected */}
      {/* {selectedTicket && (
        <div className="update-ticket-form">
          <h3>Update Ticket: {selectedTicket.ticketId}</h3>
          <label>Ticket Type</label>
          <select onChange={(e) => setTicketType(e.target.value)} value={ticketType}>
            <option value="">Select Issue Type</option>
            <option value="Service">Service</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Complaint">Complaint</option>
            <option value="Feedback">Feedback</option>
            <option value="Outage">Outage</option>
          </select>

          <label>Ticket Status</label>
          <select onChange={(e) => setTicketStatus(e.target.value)} value={ticketStatus}>
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>

          <label>Ticket Priority</label>
          <select onChange={(e) => setTicketPriority(e.target.value)} value={ticketPriority}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="update-buttons">
            <button onClick={updateTicket}>Update</button>
            <button onClick={closeTicket}>Close Ticket</button>
          </div>
        </div>
      )} */}
      {selectedTicket && (
        <>
          <div className="overlay" onClick={() => setSelectedTicket(null)}></div>
          <div className="modal">
            <h3>Update Ticket: {selectedTicket.ticketId}</h3>
            <label>Ticket Type</label>
            <select onChange={(e) => setTicketType(e.target.value)} value={ticketType}>
            <option value="Service">Service</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Complaint">Complaint</option>
            <option value="Feedback">Feedback</option>
            <option value="Outage">Outage</option>
            </select>
            <label>Ticket Status</label>
          <select onChange={(e) => setTicketStatus(e.target.value)} value={ticketStatus}>
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
            <button onClick={updateTicket}>Update</button>
            <button className="close-btn" onClick={() => setSelectedTicket(null)}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(EmployeeTickets);
