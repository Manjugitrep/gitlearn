import React, { useState, useEffect } from 'react';
import CustomerMenu from '../customermenu/customermenu';
import axios from 'axios';
import { withRouter } from '../../withRouter';
import './customerticket.css';

const CustomerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  // useEffect(() => {
  //   const cid = localStorage.getItem('cid');
  //   axios.get(`http://localhost:9829/ticket/searchTicketByCusId/${cid}`)
  //     .then((response) => {
  //       setTickets(response.data);
  //     });
  // }, []);

  useEffect(() => {
    let customerId = localStorage.getItem("customerId");
    // alert(cid);
    // alert(user);
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9829/ticket/searchTicketByCustomerId/" + customerId);
      console.log("API Response:", response.data); // Log the API response
      setTickets(response.data);
    };
    fetchData();
  }, []);

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
    <div className="component-customerticket">
      <div className="customer-menu">
      <CustomerMenu />
    </div>
      {/* <table border="2" align="center">
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
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td>{ticket.customerId}</td>
              <td>{ticket.ticketId}</td>
              <td>{ticket.employeeId}</td>
              <td>{ticket.ticketType}</td>
              <td>{ticket.ticketDescription}</td>
              <td>{ticket.ticketRaiseDate}</td>
              <td>{ticket.ticketStatus}</td>
              <td>{ticket.ticketPriority}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* ------------------------------------------------------------ */}
      <h2 className="ticket-header">Your Tickets</h2>

<div className="ticket-cards-container">
  {currentTickets.length > 0 ? (
    currentTickets.map((ticket) => (
      <div className="ticket-card" key={ticket.ticketId}>
        <h3>Ticket ID: {ticket.ticketId}</h3>
        <p><strong>Type:</strong> {ticket.ticketType}</p>
        <p><strong>Description:</strong> {ticket.ticketDescription}</p>
        <p><strong>Raised On:</strong> {ticket.ticketRaiseDate}</p>
        <p><strong>Status:</strong> <span className={`status ${ticket.ticketStatus.toLowerCase()}`}>{ticket.ticketStatus}</span></p>
        <p><strong>Priority:</strong> <span className={`priority ${ticket.ticketPriority.toLowerCase()}`}>{ticket.ticketPriority}</span></p>
      </div>
    ))
  ) : (
    <p className="no-tickets-message">No tickets found.</p>
  )}
</div>

{/* Pagination Controls */}
<div className="pagination">
  <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {totalPages}</span>
  <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
</div>
      {/* ------------------------------------------------------------ */}
      {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div> */}
    </div>
  );
};

export default withRouter(CustomerTickets);
