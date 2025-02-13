// import axios from "axios";
 
// import authHeader from "./AuthHeader";
// const API_URL = "http://localhost:9829/employee/";
 
 
// class AuthService{

//     getByUserEmail(email) {
//         return axios.get(API_URL + "searchEmployeeEmail/"+ email)
//     }
//     getAdminBoard(){
//         return axios.get(API_URL+'admin/adminProfile',{headers:authHeader()});
//     }
//     getManagerBoard(){
//         return axios.get(API_URL+'manager/managerProfile',{headers:authHeader()});
//     }
//     getEmployeeBoard(){
//         return axios.get(API_URL+'employee/employeeProfile',{headers:authHeader()});
        
//     }
//     login(username,password,designation){
 
//         return axios.post(API_URL+"generateToken",{
//             username,
//             password,
//             designation
//         })
//         .then(response => {
//             alert(response.data)
//             alert("Token Generated")
//             localStorage.setItem("token",JSON.stringify(response.data))
//             return response.data;
         
//         })
//         .catch(error => {
//             console.error("Error while generating Token", error);
//             alert("Token GeneraTion failed. Please check your credentials.");
//         });
 
//     }
 
// }
// export default new AuthService();

import axios from 'axios';

const API_URL = 'http://localhost:9829/employee/';

class AuthService {
  async login(email, password, designation) {
    try {
      const response = await axios.post(API_URL + 'generateToken', {
        username: email, // backend expects username but we send email
        password,
        designation
      });

      if (response.data) {
        // Store user details
        const userResponse = await axios.get(API_URL + 'searchEmployeeEmail/' + email);
        const employeeData = userResponse.data;
        
        localStorage.setItem('token', response.data);
        localStorage.setItem('employeeId', employeeData.employeeId);
        localStorage.setItem('designation', employeeData.employeeDesignation);
        localStorage.setItem('email', email);
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('designation');
    localStorage.removeItem('email');
  }

  getCurrentUser() {
    return {
      token: localStorage.getItem('token'),
      employeeId: localStorage.getItem('employeeId'),
      designation: localStorage.getItem('designation'),
      email: localStorage.getItem('email')
    };
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

export default new AuthService();