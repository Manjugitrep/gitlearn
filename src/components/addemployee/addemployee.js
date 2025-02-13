import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../adminmenu/adminmenu';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeId: '',
    employeeFirstName: '',
    employeeLastName: '',
    employeeDesignation: '',
    employeeDept: '',
    employeeGender: '',
    employeeDob: '',
    employeeDoj: '',
    employeeTakeHome: 0,
    employeeEmail: '',
    employeePhNo: '',
    employeePassword: '',
    employeeManagerId: ''
  });

  const [managers, setManagers] = useState([]);

  // Fetch existing managers from the backend
  useEffect(() => {
    axios.get('http://localhost:9829/employee/searchByManagerId/') // Adjust the API endpoint if needed
      .then(response => {
        setManagers(response.data); // Assuming response.data is an array of managers
      })
      .catch(error => {
        console.error("Error fetching managers:", error);
        setManagers([]);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const addEmploy = () => {
    if (!employee.employeeManagerId) {
      alert("Please select a valid manager.");
      return;
    }

    axios.post("http://localhost:9829/employee/addEmployee", employee)
      .then(response => {
        alert("A new employee has been added!");
        console.log(response.data);
        navigate("/showEmployee");
      })
      .catch(error => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <div className="component-addEmployee">
      <AdminMenu/>
      <table border="3" align="center">
        <thead>
          <tr>
            <th colSpan="2">Add Employee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>First Name</th>
            <td><input type="text" name="employeeFirstName" value={employee.employeeFirstName} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td><input type="text" name="employeeLastName" value={employee.employeeLastName} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>
              <select name="employeeGender" value={employee.employeeGender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Department</th>
            <td>
              <select name="employeeDept" value={employee.employeeDept} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="BILLING_AND_ACCOUNTS">BILLING AND ACCOUNTS</option>
                <option value="PRODUCT_AND_PLANS">PRODUCT AND PLANS</option>
                <option value="INSTALLATION_AND_SERVICE">INSTALLATION AND SERVICE</option>
                <option value="RELOCATION_REQUEST">RELOCATION REQUEST</option>
                <option value="TECHNICAL_SUPPORT">TECHNICAL SUPPORT</option>
                <option value="OUTAGE">OUTAGE</option>
                <option value="HR">HR</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Designation</th>
            <td>
              <select name="employeeDesignation" value={employee.employeeDesignation} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td><input type="date" name="employeeDob" value={employee.employeeDob} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Date of Joining</th>
            <td><input type="date" name="employeeDoj" value={employee.employeeDoj} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Take Home Salary</th>
            <td><input type="number" name="employeeTakeHome" value={employee.employeeTakeHome} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><input type="email" name="employeeEmail" value={employee.employeeEmail} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td><input type="text" name="employeePhNo" value={employee.employeePhNo} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Default Password</th>
            <td><input type="text" name="employeePassword" value={employee.employeePassword} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <th>Manager ID</th>
            <td>
              <select name="employeeManagerId" value={employee.employeeManagerId} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="">Null</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <button onClick={addEmploy}>Add Employee</button>
            </th>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default AddEmployee;