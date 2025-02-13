import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from '../adminmenu/adminmenu';

const ShowCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;

    // Separate search states
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");

    useEffect(() => {
        axios.get("http://localhost:9829/customer/showCustomer")
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    // Filtering Logic
    const filteredCustomers = customers.filter(customer =>
        (searchId === "" || customer.customerId.toString().includes(searchId)) &&
        (searchName === "" || customer.customerFirstname.toLowerCase().includes(searchName.toLowerCase()) || 
                             customer.customerLastname.toLowerCase().includes(searchName.toLowerCase())) &&
        (searchPhone === "" || customer.customerPhNo.toString().includes(searchPhone))
    );

    // Pagination Logic
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentCustomers = filteredCustomers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);

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
        <div className="component-showCustomer">
            <AdminMenu />
            <br/>
            {/* Search Inputs */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span>Customer Id: </span>
                <input 
                    type="text" 
                    placeholder="Search by Customer ID..." 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                />&nbsp;&nbsp;&nbsp;
                <span>First/Last Name: </span>
                <input 
                    type="text" 
                    placeholder="Search by First/Last Name..." 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;
                <span>Phone No.: </span>
                <input 
                    type="text" 
                    placeholder="Search by Phone Number..." 
                    value={searchPhone} 
                    onChange={(e) => setSearchPhone(e.target.value)} 
                    style={{ padding: '8px', width: '250px' }}
                />
            </div>

            <table border='2' align='center'>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Gender</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.length > 0 ? (
                        currentCustomers.map((customer, index) => (
                            <tr key={index}>
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
                                <td>{customer.customerPhNo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center" }}>No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {/* Pagination Controls */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={prevPage} disabled={currentPage === 1}>◀️</button>
                <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>▶️</button>
            </div>
        </div>
    );
};

export default ShowCustomer;
