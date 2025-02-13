import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from '../adminmenu/adminmenu';

const ShowResolve = () => {
    const [resolves, setResolve] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;

    useEffect(() => {
        axios.get("http://localhost:9829/resolve/showResolve")
            .then(response => {
                setResolve(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("Error fetching Resolved Tickets :", error));
    }, []);

    //Pagination Logic
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentResolves = resolves.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(resolves.length / recordsPerPage);

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
        <div className="component-showResolve">
          <AdminMenu />
            <table border='2' align='center'>
                <thead>
                    <tr>
                        <th>Resolve_Id</th>
                        <th>Ticket_Id</th>
                        <th>Employee_Id</th>
                        <th>Resolve Date</th>
                        <th>Employee_Description</th>
                        <th>Turn Around Time</th>
                        <th>Delay Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {currentResolves.map((resolve, index) => (
                        <tr key={index}>
                            <td>{resolve.resolveId}</td>
                            <td>{resolve.ticketId}</td>
                            <td>{resolve.employeeId}</td>
                            <td>{resolve.resolveDate}</td>
                            <td>{resolve.employeeDescription}</td>
                            <td>{resolve.turnAroundTime}</td>
                            <td>{resolve.delayReason}</td>
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

export default ShowResolve;