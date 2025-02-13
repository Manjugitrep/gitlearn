// export default function AuthHeader() {
//     const token = localStorage.getItem("token"); // Get the token directly as a string
//     if (token) {
//         return { Authorization: 'Bearer ' + token };
//     } else {
//         return {};
//     }
// }

export default function authHeader() {
    const token = localStorage.getItem('token');
    
    if (token) {
      // For Spring Boot backend
      return { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    } else {
      return {};
    }
  }