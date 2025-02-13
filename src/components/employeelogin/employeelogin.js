// import React, {Component, useEffect, useState} from 'react';
// import axios from 'axios';
// import { withRouter } from '../../withRouter';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../../services/AuthService';

// const EmployeeLogin = () => {
//   const[data, setState] = useState({
//     username: '',
//     passWord: '',
//     designation:'',
//     result:''
//   })

//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//  const handleChange = event => {
//   setState({
//     ...data,[event.target.name] : event.target.value
//   })
//  }

//  const validate = () =>{
 
//   setErrorMessage('');

//   // Validation checks
//   if (!data.username || !data.passWord || !data.designation) {
//     setErrorMessage('Please fill in all fields.');
//     return;
//   }

//   AuthService.login(data.username,data.passWord,data.designation)
//   .then(response =>{
//       localStorage.setItem("token", response.data);
//       localStorage.setItem("designation", data.employeeDesignation); // Replace response.data with the actual token received from your backend
//       localStorage.setItem("employeeId",data.employeeId);
//       // AuthService.
//       alert("Result is " +response)

//       const userRole = localStorage.getItem("designation");
//       localStorage.setItem("username", data.username);

//       if (userRole === 'Admin') {
//           navigate("/admin");
//       } else if (userRole === 'Manager') {
//           navigate("/manager");
//       } else if (userRole === 'Employee') {
//           navigate("/employeeMenu");
//       } else {
//           alert("Invalid role in token.");
//       }
//      })
//      .catch(error => {
//       console.error("Error While login Invalid Credintials", error);
//       alert("Login failed. Please check your credentials.");
//   });
// }

//   return(
//     <center>
//       <table border="2">
//         <tr>
//           <th colSpan="2">Login Page</th>
//         </tr>
//         <tr>
//           <th>User Name</th>
//           <td>
//             <input type='text' name='username' value={data.username} onChange={handleChange} />
//           </td>
//         </tr>
//         <tr>
//           <th>PassWord</th>
//           <td>
//           <input type='password' name='passWord' value={data.passWord} onChange={handleChange} />
//           </td>
//         </tr>
//         <tr>
//           <th>Designation</th>
//           <select
//                 name="designation"
//                 className="form-input"
//                 value={data.designation}
//                 onChange={handleChange}
//           >
//             <option value="">Select Designation</option>
//             <option value="Admin">Admin</option>
//             <option value="Manager">Manager</option>
//             <option value="Employee">Employee</option>
//           </select>
//         </tr>
//         <tr>
//           <th colSpan='2'>
//               <input type='button' value='Login' onClick={validate} />
//           </th>
//         </tr>
//         </table>
//         </center>
//   )
// } 

// export default withRouter(EmployeeLogin)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
 import './employeelogin.css';

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    designation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.designation) {
      setError('Please fill in all fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await AuthService.login(formData.email, formData.password, formData.designation);
      
      // Navigate based on role
      switch (formData.designation) {
        case 'Admin':
          navigate('/adminMenu');
          break;
        case 'Manager':
          navigate('/manager');
          break;
        case 'Employee':
          navigate('/employeeMenu');
          break;
        default:
          setError('Invalid designation');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Employee Login</h2>
  
        {error && <div className="error-message">{error}</div>}
  
        <form onSubmit={handleSubmit}>
          <table className="login-table" >
            <tbody>
              <tr>
                <td><label>Email:</label></td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </td>
              </tr>
  
              <tr>
                <td><label>Password:</label></td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </td>
              </tr>
  
              <tr>
                <td><label>Designation:</label></td>
                <td>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="form-control"
                    disabled={loading}
                  >
                    <option value="">Select Designation</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </td>
              </tr>
  
              <tr>
                <td colSpan="2" align="center">
                  <button 
                    type="submit" 
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
  
};

export default EmployeeLogin;