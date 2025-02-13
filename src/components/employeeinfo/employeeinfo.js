import React, {Component, useEffect} from 'react';
import { withRouter } from '../../withRouter';
import { useState } from 'react';
import axios from 'axios';
import EmployeeMenu from '../employeemenu/employeemenu';
import { useNavigate } from 'react-router-dom';

const EmployeeInfo =()=>{
 
  const[employee,setEmployee]= useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    let employeeId = localStorage.getItem("employeeId");
    let username = localStorage.getItem("username");
    // alert(employeeId);
    // alert(user);
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9829/employee/searchEmployee/" + employeeId);
      console.log("API Response:", response.data); // Log the API response
      localStorage.setItem("employeeId",response.data.employeeId);
      setEmployee(response.data);
    };
    fetchData();
  }, []);

return (
  
  <div>
    <EmployeeMenu />
    <table border="3" align="center">
      <thead>
        <tr>
          <th colSpan="12">Employee Info</th>
        </tr>
        <tr>
          <th>Employee Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Gender</th>
          <th>D.O.B</th>
          <th>D.O.J</th>
          <th>Take Home</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>Manager Id</th>
        </tr>
      </thead>
      <tbody>

        {employee ? (
          <tr key={employee.employeeId}>
            <td>{employee.employeeId}</td>
            <td>{employee.employeeFirstName}</td>
            <td>{employee.employeeLastName}</td>
            <td>{employee.employeeDesignation}</td>
            <td>{employee.employeeDept}</td>
            <td>{employee.employeeGender}</td>
            <td>{employee.employeeDob}</td>
            <td>{employee.employeeDoj}</td>
            <td>{employee.employeeTakeHome}</td>
            <td>{employee.employeeEmail}</td>
            <td>{employee.employeePhNo}</td>
            <td>{employee.employeeManagerId}</td>
          </tr>
        ) : (
          <tr>
            <td colSpan="12">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => navigate("/updateEmployee", { state: { employee } })}>
          Update
        </button>
    </div>
  </div>
);

}
 
export default withRouter(EmployeeInfo);