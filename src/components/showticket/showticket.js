import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from '../adminmenu/adminmenu';

const ShowTicket = () => {
    const [customer, setCustomer] = useState({
        customerId:0
    });

    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;

    // Separate search states
    const [searchEmployeeId, setSearchEmployeeId] = useState("");
    const [searchTicketType, setSearchTicketType] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchPriority, setSearchPriority] = useState("");

    // Filtering Logic
    const filteredTickets = tickets.filter(ticket =>
      (searchEmployeeId === "" || ticket.employeeId.toString().includes(searchEmployeeId)) &&
      (searchTicketType === "" || ticket.ticketType.toLowerCase().includes(searchTicketType.toLowerCase())) &&
      (searchStatus === "" || ticket.ticketStatus.toLowerCase().includes(searchStatus.toLowerCase())) &&
      (searchPriority === "" || ticket.ticketPriority.toLowerCase().includes(searchPriority.toLowerCase()))
  );

    useEffect(() => {
        axios.get("http://localhost:9829/ticket/showTicket")
            .then(response => {
                setTickets(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("Error fetching tickets:", error));
    }, []);

    //Pagination Logic
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentTickets = filteredTickets.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredTickets.length / recordsPerPage);

    useEffect(() => {
      setCurrentPage(1);
  }, [searchEmployeeId, searchTicketType, searchStatus, searchPriority]);

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
        <div className="component-showTicket">
          <AdminMenu />
          <br/>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span>Employee Id: </span>
                <input 
                    type="text" 
                    placeholder="Search by Employee ID..." 
                    value={searchEmployeeId} 
                    onChange={(e) => setSearchEmployeeId(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                />&nbsp;&nbsp;&nbsp;
                <span>Ticket Type: </span>
                <input 
                    type="text" 
                    placeholder="Search by Ticket type..." 
                    value={searchTicketType} 
                    onChange={(e) => setSearchTicketType(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                /> <br/><br/>
                <span>Status: </span>
                <input 
                    type="text" 
                    placeholder="Search by Ticket Status..." 
                    value={searchStatus} 
                    onChange={(e) => setSearchStatus(e.target.value)} 
                    style={{ padding: '8px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Designation: </span>
                <input 
                    type="text" 
                    placeholder="Search By Priority..." 
                    value={searchPriority} 
                    onChange={(e) => setSearchPriority(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;
                
            </div>
            <table border='2' align='center'>
                <thead>
                    <tr>
                        <th>Ticket_Id</th>
                        <th>Customer_Id</th>
                        <th>Employee_Id</th>
                        <th>Domain</th>
                        <th>Description</th>
                        <th>Raise Date</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody align='center'>
                    {currentTickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.ticketId}</td>
                            <td>{ticket.customer.customerId}</td>
                            <td>{ticket.employeeId}</td>
                            <td>{ticket.ticketType}</td>
                            <td>{ticket.ticketDescription}</td>
                            <td>{ticket.ticketRaiseDate}</td>
                            <td>{ticket.ticketStatus}</td>
                            <td>{ticket.ticketPriority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>

        </div>
    );
};

export default ShowTicket;