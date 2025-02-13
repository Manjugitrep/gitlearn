import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../adminmenu/adminmenu';


const ShowEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const [updatedEmployee, setUpdatedEmployee] = useState({
        employeeId: "",
        employeeFirstName: "",
        employeeLastName: "",
        employeeDesignation: "",
        employeeDept: "",
        employeeGender:"",
        employeeDob:"",
        employeeDoj:"",
        employeeTakeHome: "",
        employeeEmail: "",
        employeePhNo:"",
        employeePassword:"",
        employeeManagerId: "",
    });

    // Separate search states
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchDesignation, setSearchDesignation] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [searchTakeHome, setSearchTakeHome] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    // const [searchManagerId, setSearchManagerId] = useState("");


    useEffect(() => {
        axios.get("http://localhost:9829/employee/showEmployee")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchId, searchName, searchDesignation, searchDepartment, searchTakeHome, searchPhone]);

     // Filtering Logic
     const filteredEmployees = employees.filter(employee =>
      (searchId === "" || employee.employeeId.toString().includes(searchId)) &&
      (searchName === "" || employee.employeeFirstName.toLowerCase().includes(searchName.toLowerCase()) || 
                           employee.employeeLastName.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchPhone === "" || employee.employeePhNo.toString().includes(searchPhone)) && 
      (searchDesignation === "" || employee.employeeDesignation.toLowerCase().includes(searchDesignation.toLowerCase())) &&
      (searchDepartment === "" || employee.employeeDept.toLowerCase().includes(searchDepartment.toLowerCase())) &&
      (searchTakeHome === "" || employee.employeeTakeHome.toString().includes(searchTakeHome))
  );

    const handleUpdateClick = (employee) => {
        setSelectedEmployee(employee.employeeId);
        setUpdatedEmployee({
            employeeId: employee.employeeId,
            employeeFirstName: employee.employeeFirstName,
            employeeLastName: employee.employeeLastName,
            employeeDesignation: employee.employeeDesignation,
            employeeDept: employee.employeeDept,
            employeeGender: employee.employeeGender,
            employeeDob:employee.employeeDob,
            employeeDoj:employee.employeeDoj,
            employeeTakeHome: employee.employeeTakeHome,
            employeeEmail: employee.employeeEmail,
            employeePhNo:employee.employeePhNo,
            employeePassword: employee.employeePassword,
            employeeManagerId: employee.employeeManagerId,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:9829/employee/updateEmployee", updatedEmployee)
            .then(() => {
                alert("Employee details updated successfully");
                setEmployees(employees.map(emp => emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp));
                setSelectedEmployee(null);
            })
            .catch(error => console.error("Error updating employee:", error));
    };

    const handleDelete = (employeeId) => {
        if (window.confirm("Do you really want to delete this employee?")) {
            axios.delete(`http://localhost:9829/employee/deleteEmployee/${employeeId}`)
                .then(() => {
                    alert("Employee deleted successfully");
                    setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
                })
                .catch(error => console.error("Error deleting employee:", error));
        }
    };

    //Pagination Logic
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentEmployees = filteredEmployees.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

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
        <div className="component-showEmployee">
            <AdminMenu />
            <br/>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span>Employee Id: </span>
                <input 
                    type="text" 
                    placeholder="Search by Employee ID..." 
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
                />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/><br/>
                <span>Designation: </span>
                <input 
                    type="text" 
                    placeholder="Search By Designation" 
                    value={searchDesignation} 
                    onChange={(e) => setSearchDesignation(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;
                <span>Department</span>
                <input 
                    type="text" 
                    placeholder="Search By Department" 
                    value={searchDepartment} 
                    onChange={(e) => setSearchDepartment(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;
                <span>Take Home: </span>
                <input 
                    type="text" 
                    placeholder="Search by Take Home..." 
                    value={searchTakeHome} 
                    onChange={(e) => setSearchTakeHome(e.target.value)} 
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />&nbsp;&nbsp;&nbsp;
            </div>
            <table border='2' align='center'>
                <thead>
                    <tr>
                        <th>Employee_Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Date of Join</th>
                        <th>Take Home</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Manager Id</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody align='center'>
                    {currentEmployees.map(employee => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.employeeFirstName}</td>
                            <td>{employee.employeeLastName}</td>
                            <td>{employee.employeeDesignation}</td>
                            <td>{employee.employeeGender}</td>
                            <td>{employee.employeeDept}</td>
                            <td>{employee.employeeDob}</td>
                            <td>{employee.employeeDoj}</td>
                            <td>{employee.employeeTakeHome}</td>
                            <td>{employee.employeeEmail}</td>
                            <td>{employee.employeePhNo}</td>
                            <td>{employee.employeeManagerId}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(employee)}>Update</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(employee.employeeId)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
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

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => navigate('/addEmployee')} style={{ padding: '10px 20px', background: 'grey', color: 'black', fontSize: '16px', borderRadius: '5px' }}>
                  Add Employee
              </button>
            </div>

            {selectedEmployee && (
                <div>
                    <h2 style={{ textAlign: "center" }}>Update Employee Details</h2>
                    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "20px" }}>
                        <table border="2" align="center">
                            <tbody>
                                <tr>
                                    <th>Employee Id</th>
                                    <td><input type="text" name="employeeId" value={updatedEmployee.employeeId} readOnly /></td>
                                </tr>
                                <tr>
                                    <th>First Name</th>
                                    <td><input type="text" name="employeeFirstName" value={updatedEmployee.employeeFirstName} readOnly /></td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td><input type="text" name="employeeLastName" value={updatedEmployee.employeeLastName} readOnly /></td>
                                </tr>
                                <tr>
                                  <th>Designation</th>
                                  <td>
                                    <select name="employeeDesignation" value={updatedEmployee.employeeDesignation} onChange={handleChange}>
                                      <option value="">Select</option>
                                      <option value="Admin">Admin</option>
                                      <option value="Manager">Manager</option>
                                      <option value="Representative">Representative</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <th>Gender</th>
                                  <td>
                                    <select name="employeeGender" value={updatedEmployee.employeeGender} onChange={handleChange}>
                                      <option value="">Select</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <th>Department</th>
                                  <td>
                                    <select name="employeeDept" value={updatedEmployee.employeeDept} onChange={handleChange}>
                                      <option value="">Select</option>
                                      <option value="IT">IT</option>
                                      <option value="HR">HR</option>
                                      <option value="Business">Business</option>
                                      <option value="Service">Service</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <th>Date of Birth</th>
                                  <td><input type="date" name="employeeDob" value={updatedEmployee.employeeDob} onChange={handleChange} readOnly /></td>
                                </tr>
                                <tr>
                                  <th>Date of Join</th>
                                  <td><input type="date" name="employeeDoj" value={updatedEmployee.employeeDoj} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <th>Take Home Salary</th>
                                    <td><input type="text" name="employeeTakeHome" value={updatedEmployee.employeeTakeHome} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td><input type="email" name="employeeEmail" value={updatedEmployee.employeeEmail} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <th>Phone No.</th>
                                    <td><input type="text" name="employeePhNo" value={updatedEmployee.employeePhNo} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                  <th>Manager ID</th>
                                  <td>
                                    <select name="employeeManagerId" value={updatedEmployee.employeeManagerId} onChange={handleChange}>
                                      <option value="">Select</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                    </select>
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>Save Changes</button>
                        <button type="button" onClick={() => setSelectedEmployee(null)} style={{ marginLeft: "10px", padding: "10px 20px", background: "gray", color: "white" }}>Cancel</button>
                    </form>
                    
                </div>
            )}
        </div>
    );
};

export default ShowEmployee;
