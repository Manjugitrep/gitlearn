import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeMenu from '../employeemenu/employeemenu';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeId: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeDesignation: "",
    employeeDept: "",
    employeeGender: "",
    employeeDob: "",
    employeeDoj: "",
    employeeTakeHome: "",
    employeeEmail:"",
    employeePhNo:"",
    employeeEmail:"",
  });

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9829/employee/searchEmployee/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:9829/employee/updateEmployee", employee)
      .then(() => {
        alert("Your details have been modified");
        navigate("/employeeInfo");
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmployeeMenu />
      <h2 style={{ textAlign: "center" }}>Update Employee Details</h2>
      <table border="2" align="center">
        <tbody>
          <tr>
            <th>Employee Id</th>
            <td><input type="text" name="employeeId" value={employee.employeeId} readOnly /></td>
          </tr>
          <tr>
            <th>First Name</th>
            <td><input type="text" name="employeeFirstName" value={employee.employeeFirstName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td><input type="text" name="employeeLastName" value={employee.employeeLastName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Designation</th>
            <td><input type="text" name="employeeDesignation" value={employee.employeeDesignation} onChange={handleChange} readOnly/></td>
          </tr>
          <tr>
            <th>Department</th>
            <td><input type="text" name="employeeDept" value={employee.employeeDept} onChange={handleChange} readOnly/></td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>
              <select name="employeeGender" value={employee.employeeGender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td><input type="date" name="employeeDob" value={employee.employeeDob} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Date of Joining</th>
            <td><input type="date" name="employeeDoj" value={employee.employeeDoj} onChange={handleChange} readOnly/></td>
          </tr>
          <tr>
            <th>Take Home Salary</th>
            <td><input type="text" name="employeeTakeHome" value={employee.employeeTakeHome} onChange={handleChange} readOnly/></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><input type="email" name="employeeEmail" value={employee.employeeEmail} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Phone No.</th>
            <td><input type="text" name="employeePhNo" value={employee.employeePhNo} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateEmployee;