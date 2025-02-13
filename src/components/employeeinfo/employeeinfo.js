// import React, {Component, useEffect} from 'react';
// import { withRouter } from '../../withRouter';
// import { useState } from 'react';
// import axios from 'axios';
// import EmployeeMenu from '../employeemenu/employeemenu';
// import { useNavigate } from 'react-router-dom';
// import './employeeinfo.css';

// const EmployeeInfo =()=>{
 
//   const[employee,setEmployee]= useState([]);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     let employeeId = localStorage.getItem("employeeId");
//     let username = localStorage.getItem("username");
//     // alert(employeeId);
//     // alert(user);
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:9829/employee/searchEmployee/" + employeeId);
//       console.log("API Response:", response.data); // Log the API response
//       localStorage.setItem("employeeId",response.data.employeeId);
//       setEmployee(response.data);
//     };
//     fetchData();
//   }, []);

// return (
  
//   <div>
//     <EmployeeMenu />
//     <table border="3" align="center">
//       <thead>
//         <tr>
//           <th colSpan="12">Employee Info</th>
//         </tr>
//         <tr>
//           <th>Employee Id</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Designation</th>
//           <th>Department</th>
//           <th>Gender</th>
//           <th>D.O.B</th>
//           <th>D.O.J</th>
//           <th>Take Home</th>
//           <th>Email</th>
//           <th>Phone No.</th>
//           <th>Manager Id</th>
//         </tr>
//       </thead>
//       <tbody>

//         {employee ? (
//           <tr key={employee.employeeId}>
//             <td>{employee.employeeId}</td>
//             <td>{employee.employeeFirstName}</td>
//             <td>{employee.employeeLastName}</td>
//             <td>{employee.employeeDesignation}</td>
//             <td>{employee.employeeDept}</td>
//             <td>{employee.employeeGender}</td>
//             <td>{employee.employeeDob}</td>
//             <td>{employee.employeeDoj}</td>
//             <td>{employee.employeeTakeHome}</td>
//             <td>{employee.employeeEmail}</td>
//             <td>{employee.employeePhNo}</td>
//             <td>{employee.employeeManagerId}</td>
//           </tr>
//         ) : (
//           <tr>
//             <td colSpan="12">Loading...</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button onClick={() => navigate("/updateEmployee", { state: { employee } })}>
//           Update
//         </button>
//     </div>
//   </div>
// );

// }
 
// export default withRouter(EmployeeInfo);

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import EmployeeMenu from '../employeemenu/employeemenu';
// import './employeeinfo.css'; // Assuming this is the CSS file for styling

// const EmployeeInfo = () => {
//   const [employee, setEmployee] = useState(null || 7);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const employeeId = localStorage.getItem("employeeId");
    
//     if (employeeId) {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:9829/employee/searchEmployee/${employeeId}`);
//           //console.log("API Response:", response.data);
//           setEmployee(response.data);
//         } catch (error) {
//           console.error("Error fetching employee data", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     } else {
//       setLoading(false); // Handle case if employeeId is not found in localStorage
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <EmployeeMenu />
//       <div className="employee-info-container">
//         <h2 className="employee-info-title">Employee Information</h2>
//         <table className="employee-info-table">
//           <thead>
//             <tr>
//               <th>Employee Id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Designation</th>
//               <th>Department</th>
//               <th>Gender</th>
//               <th>D.O.B</th>
//               <th>D.O.J</th>
//               <th>Take Home</th>
//               <th>Email</th>
//               <th>Phone No.</th>
//               <th>Manager Id</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employee && (
//               <tr>
//                 <td>{employee.employeeId}</td>
//                 <td>{employee.employeeFirstName}</td>
//                 <td>{employee.employeeLastName}</td>
//                 <td>{employee.employeeDesignation}</td>
//                 <td>{employee.employeeDept}</td>
//                 <td>{employee.employeeGender}</td>
//                 <td>{employee.employeeDob}</td>
//                 <td>{employee.employeeDoj}</td>
//                 <td>{employee.employeeTakeHome}</td>
//                 <td>{employee.employeeEmail}</td>
//                 <td>{employee.employeePhNo}</td>
//                 <td>{employee.employeeManagerId}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <div className="update-button-container">
//           <button onClick={() => navigate("/updateEmployee", { state: { employee } })} className="update-button">
//             Update Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeInfo;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeMenu from '../employeemenu/employeemenu';
import '../customerinfo/customerinfo.css'; // Relative path from employeeinfo to customerinfo

//import './customerinfo.css'; // Reusing the same CSS for consistent styling

const EmployeeInfo = () => {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    if (employeeId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:9829/employee/searchEmployee/${employeeId}`);
          //const response = await axios.get(`http://localhost:9829/employee/searchEmployee/${1}`);
          setEmployee(response.data);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      <EmployeeMenu />
      <div className="profile-container">
        <div className="profile-header">
          <h2>Employee Profile</h2>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          {/* First column with profile image, employee ID, and designation */}
          <div className="profile-info-col">
            <div className="profile-image-section">
              <img
                src={employee?.profilePic || "/images/default-profile1.png"}
                alt="Employee"
                className="profile-image"
              />
            </div>
            <div>
              <div className="detail-label">Employee ID:</div>
              <div className="detail-value">{employee?.employeeId}</div>
            </div>
            <div>
              <div className="detail-label">Designation:</div>
              <div className="detail-value">{employee?.employeeDesignation}</div>
            </div>
          </div>

          {/* Second column with other employee information */}
          <div className="other-info-col">
            <div>
              <div className="detail-label">Name:</div>
              <div className="detail-value">
                {employee?.employeeFirstName} {employee?.employeeLastName}
              </div>
            </div>
            <div>
              <div className="detail-label">Email:</div>
              <div className="detail-value">{employee?.employeeEmail}</div>
            </div>
            <div>
              <div className="detail-label">Phone No:</div>
              <div className="detail-value">{employee?.employeePhNo}</div>
            </div>
            <div>
              <div className="detail-label">Department:</div>
              <div className="detail-value">{employee?.employeeDept}</div>
            </div>
            <div>
              <div className="detail-label">Gender:</div>
              <div className="detail-value">{employee?.employeeGender}</div>
            </div>
            <div>
              <div className="detail-label">D.O.B:</div>
              <div className="detail-value">{employee?.employeeDob}</div>
            </div>
            <div>
              <div className="detail-label">D.O.J:</div>
              <div className="detail-value">{employee?.employeeDoj}</div>
            </div>
            <div>
              <div className="detail-label">Take Home:</div>
              <div className="detail-value">{employee?.employeeTakeHome}</div>
            </div>
            <div>
              <div className="detail-label">Manager ID:</div>
              <div className="detail-value">{employee?.employeeManagerId}</div>
            </div>
          </div>
        </div>

        {employee === null && <p className="loading-message">Loading...</p>}

        <div className="button-container">
          <button
            className="update-button"
            onClick={() => navigate("/updateEmployee", { state: { employee } })}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
