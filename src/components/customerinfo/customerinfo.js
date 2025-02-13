// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CustomerMenu from "../customermenu/customermenu";
// import './customerinfo.css';

// const CustomerInfo = () => {
//     const [customer, setCustomer] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const cId = localStorage.getItem("customerId");

//         axios.get("http://localhost:9829/customer/searchCustomer/" + cId)
//             .then((response) => {
//                 setCustomer(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching customer data:", error);
//             });
//     }, []);


//     //log-out 
//     const handleLogout = () => {
//       localStorage.removeItem("customerId");
//       navigate("/login");
//   };

//     return (
//         <div>
//             <CustomerMenu />
//             <div className="profile-container">
//                 <div className="profile-header">
//                     <h2>Customer Profile</h2>
//                 </div>

//         <img
//           src={defaultProfilePic} // Default customer image
//           alt="Customer"
//           className="profile-picture"
//         />
//                 {customer ? (
//                     <div className="profile-details">
//                         <div className="detail-row">
//                             <span className="detail-label">Customer ID:</span>
//                             <span className="detail-value">{customer.customerId}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Name:</span>
//                             <span className="detail-value">{customer.customerFirstname} {customer.customerLastname}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Address:</span>
//                             <span className="detail-value">{customer.customerAddress}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Pincode:</span>
//                             <span className="detail-value">{customer.customerPincode}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">City:</span>
//                             <span className="detail-value">{customer.customerCity}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">State:</span>
//                             <span className="detail-value">{customer.customerState}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Gender:</span>
//                             <span className="detail-value">{customer.customerGender}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Username:</span>
//                             <span className="detail-value">{customer.customerUsername}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Email:</span>
//                             <span className="detail-value">{customer.customerEmail}</span>
//                         </div>
//                         <div className="detail-row">
//                             <span className="detail-label">Phone No:</span>
//                             <span className="detail-value">{customer.customerPhno}</span>
//                         </div>

//                         <div className="button-container">
//                             <button
//                                 className="update-button"
//                                 onClick={() => navigate("/updateCustomer", { state: { customer } })}
//                             >
//                                 Update Profile
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>Loading...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerInfo;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CustomerMenu from "../customermenu/customermenu";
// import "./customerinfo.css";
// //import defaultProfilePic from "../../assets/default-profile.png"; // Add a default image

// const CustomerInfo = () => {
//   const [customer, setCustomer] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cId = localStorage.getItem("customerId");

//     axios
//       .get("http://localhost:9829/customer/searchCustomer/" + cId)
//       .then((response) => {
//         setCustomer(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching customer data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <CustomerMenu />
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>Customer Profile</h2>
//         </div>
//         <img src="/images/default-profile.png" alt="Customer" className="profile-picture" />


//         {customer ? (
//           <div className="profile-details">
//             <div className="detail-box">
//               <span className="detail-label">Customer ID:</span>
//               <br />
//               <span className="detail-value">{customer.customerId}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Name:</span>
//               <br />
//               <span className="detail-value">
//                 {customer.customerFirstname} {customer.customerLastname}
//               </span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Email:</span>
//               <br />
//               <span className="detail-value">{customer.customerEmail}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Phone No:</span>
//               <br />
//               <span className="detail-value">{customer.customerPhno}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">City:</span>
//               <br />
//               <span className="detail-value">{customer.customerCity}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">State:</span>
//               <br />
//               <span className="detail-value">{customer.customerState}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Pincode:</span>
//               <br />
//               <span className="detail-value">{customer.customerPincode}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Gender:</span>
//               <br />
//               <span className="detail-value">{customer.customerGender}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Username:</span>
//               <br />
//               <span className="detail-value">{customer.customerUsername}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Address:</span>
//               <br />
//               <span className="detail-value">{customer.customerAddress}</span>
//             </div>
//           </div>
//         ) : (
//           <p className="loading-message">Loading...</p>
//         )}

//         <div className="button-container">
//           <button
//             className="update-button"
//             onClick={() => navigate("/updateCustomer", { state: { customer } })}
//           >
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerInfo;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CustomerMenu from "../customermenu/customermenu";
// import "./customerinfo.css";
// //import defaultProfilePic from "../../assets/default-profile.png"; // Add a default image

// const CustomerInfo = () => {
//   const [customer, setCustomer] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cId = localStorage.getItem("customerId");

//     axios
//       .get("http://localhost:9829/customer/searchCustomer/" + cId)
//       .then((response) => {
//         setCustomer(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching customer data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <CustomerMenu />
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>My Profile</h2>
//         </div>

//         <img src="/images/default-profile.png" alt="Customer" className="profile-picture" />


//         {customer ? (
//           <div className="profile-details">
//             <div className="detail-box">
//               <span className="detail-label">Customer ID:</span>
//               <br />
//               <span className="detail-value">{customer.customerId}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Name:</span>
//               <br />
//               <span className="detail-value">
//                 {customer.customerFirstname} {customer.customerLastname}
//               </span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Email:</span>
//               <br />
//               <span className="detail-value">{customer.customerEmail}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Phone No:</span>
//               <br />
//               <span className="detail-value">{customer.customerPhno}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">City:</span>
//               <br />
//               <span className="detail-value">{customer.customerCity}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">State:</span>
//               <br />
//               <span className="detail-value">{customer.customerState}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Pincode:</span>
//               <br />
//               <span className="detail-value">{customer.customerPincode}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Gender:</span>
//               <br />
//               <span className="detail-value">{customer.customerGender}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Username:</span>
//               <br />
//               <span className="detail-value">{customer.customerUsername}</span>
//             </div>
//             <div className="detail-box">
//               <span className="detail-label">Address:</span>
//               <br />
//               <span className="detail-value">{customer.customerAddress}</span>
//             </div>
//           </div>
//         ) : (
//           <p className="loading-message">Loading...</p>
//         )}

//         <div className="button-container">
//           <button
//             className="update-button"
//             onClick={() => navigate("/updateCustomer", { state: { customer } })}
//           >
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerInfo;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerMenu from "../customermenu/customermenu";
import "./customerinfo.css";

const CustomerInfo = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cId = localStorage.getItem("customerId");

    // Fetch customer data from the API
    axios
      .get(`http://localhost:9829/customer/searchCustomer/${cId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  return (
    <div>
      <CustomerMenu />
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          {/* First column with profile image, username, and customer ID */}
          <div className="profile-info-col">
            <div className="profile-image-section">
              <img
                src={customer?.profilePic || "/images/default-profile.png"}
                alt="Customer"
                className="profile-image"
              />
            </div>
            <div>
              <div className="detail-label">Customer ID:</div>
              <div className="detail-value">{customer?.customerId}</div>
            </div>
            <div>
              <div className="detail-label">Username:</div>
              <div className="detail-value">{customer?.customerUsername}</div>
            </div>
          </div>

          {/* Second column with other customer information */}
          <div className="other-info-col">
            <div>
              <div className="detail-label">Name:</div>
              <div className="detail-value">
                {customer?.customerFirstname} {customer?.customerLastname}
              </div>
            </div>
            <div>
              <div className="detail-label">Email:</div>
              <div className="detail-value">{customer?.customerEmail}</div>
            </div>
            <div>
              <div className="detail-label">Phone No:</div>
              <div className="detail-value">{customer?.customerPhno}</div>
            </div>
            <div>
              <div className="detail-label">City:</div>
              <div className="detail-value">{customer?.customerCity}</div>
            </div>
            <div>
              <div className="detail-label">State:</div>
              <div className="detail-value">{customer?.customerState}</div>
            </div>
            <div>
              <div className="detail-label">Pincode:</div>
              <div className="detail-value">{customer?.customerPincode}</div>
            </div>
            <div>
              <div className="detail-label">Gender:</div>
              <div className="detail-value">{customer?.customerGender}</div>
            </div>
            <div>
              <div className="detail-label">Address:</div>
              <div className="detail-value">{customer?.customerAddress}</div>
            </div>
          </div>
        </div>

        {customer === null && <p className="loading-message">Loading...</p>}

        <div className="button-container">
          <button
            className="update-button"
            onClick={() => navigate("/updateCustomer", { state: { customer } })}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
