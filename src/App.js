import './App.css';
import Chatbot from './components/chatbot/chatbot';
import CustomerInfo from './components/customerinfo/customerinfo';
import CustomerLogin from './components/customerlogin/customerlogin';
import CustomerMenu from './components/customermenu/customermenu';
import CustomerTickets from './components/customertickets/customertickets';
import EmployeeInfo from './components/employeeinfo/employeeinfo';
import EmployeeLogin from './components/employeelogin/employeelogin';
import EmployeeMenu from './components/employeemenu/employeemenu';
import EmployeeTickets from './components/employeetickets/employeetickets';
import HomePage from './components/homepage/homepage';
import{
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
 
} from "react-router-dom";
import UpdateCustomer from './components/updatecustomer/updatecustomer';
import ShowEmployee from './components/showemployee/showemployee';
import AboutUs from './components/aboutus/aboutus';
import ShowTicket from './components/showticket/showticket';
import ShowResolve from './components/showresolve/showresolve';
import UpdateEmployee from './components/updateemployee/updateemployee';
import AddEmployee from './components/addemployee/addemployee';
import ShowCustomer from './components/showcustomer/showcustomer';
import AddTicket from './components/addticket/addticket';
import AdminMenu from './components/adminmenu/adminmenu';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './components/forgotpassword/resetpassword';
import ForgotPasswordcustomer from './components/forgotpassword/forgotpasswordcustomer';
import ResetPasswordcustomer from './components/forgotpassword/resetpasswordcustomer';
import OutageMap from './components/outagemap/outagemap';
import LoginCustomer from './components/logincustomer/logincustomer';
import TicketCountByLocation from './components/locationticketchart/locationticketchart';
import AverageResolutionChart from './components/employeeavgresolutionchart/employeeavgresolutionchart';
import ResponseTimeChart from './components/employeeavgresponsechart/employeeavgresponsechart';
import TicketStatusChart from './components/ticketstatuschart/ticketstatuschart';
import DomainTicketChart from './components/domainticketchart/domainticketchart';
import ChartMenu from './components/chartmenu/chartmenu';
import ProtectedRoute from './components/protectedroute/protectedroute';
import ProtectedRoutecustomer from './components/protectedroutecustomer/protectedroutecustomer';


function App() {
  return (
    <div className="App">
      <center>
        <h2>Customer Service Management</h2>
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/customerLogin" element={<CustomerLogin />} />
            <Route path='/loginCustomer' element={<LoginCustomer/>} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpasswordcustomer" element={<ForgotPasswordcustomer/>} />
            <Route path="/resetpasswordcustomer" element={<ResetPasswordcustomer/>} />
            
            {/* Protected -customer */}
            <Route path="/customerMenu" element={<ProtectedRoutecustomer><CustomerMenu /></ProtectedRoutecustomer>} />
            <Route path="/customerInfo" element={<ProtectedRoutecustomer><CustomerInfo /></ProtectedRoutecustomer>} />
            <Route path="/customerTickets" element={<ProtectedRoutecustomer><CustomerTickets /></ProtectedRoutecustomer>} />
            <Route path="/updateCustomer" element={<ProtectedRoutecustomer><UpdateCustomer /></ProtectedRoutecustomer>} />
            <Route path="/addTicket" element={<ProtectedRoutecustomer><AddTicket /></ProtectedRoutecustomer>} />
            <Route path="/chatbot" element={<ProtectedRoutecustomer><Chatbot /></ProtectedRoutecustomer>} />

            {/* Public Routes for Employees */}
            <Route path="/employeeLogin" element={<EmployeeLogin />} />

            {/* Protected Routes for Employees and Admins */}
            <Route path="/employeeMenu" element={<ProtectedRoute allowedRoles={['Employee', 'Admin']}><EmployeeMenu /></ProtectedRoute>}/>
            <Route path="/adminMenu" element={<ProtectedRoute allowedRoles={['Admin']}><AdminMenu /></ProtectedRoute>}/>
            <Route path="/employeeInfo" element={<ProtectedRoute allowedRoles={['Employee', 'Admin']}><EmployeeInfo /></ProtectedRoute>}/>
            <Route path="/showEmployee" element={<ProtectedRoute allowedRoles={['Admin']}><ShowEmployee /></ProtectedRoute>}/>
            <Route path="/addEmployee" element={<ProtectedRoute allowedRoles={['Admin']}><AddEmployee /></ProtectedRoute>}/>
            <Route path="/updateEmployee" element={<ProtectedRoute allowedRoles={['Admin']}><UpdateEmployee /></ProtectedRoute>}/>
            <Route path="/employeeTickets" element={<ProtectedRoute allowedRoles={['Employee', 'Admin']}><EmployeeTickets /></ProtectedRoute>}/>
            <Route path="/showCustomer" element={<ProtectedRoute allowedRoles={['Admin']}><ShowCustomer /></ProtectedRoute>}/>
            <Route path="/showTicket" element={<ProtectedRoute allowedRoles={['Employee', 'Admin']}><ShowTicket /></ProtectedRoute>}/>
            <Route path="/showResolve" element={<ProtectedRoute allowedRoles={['Employee', 'Admin']}><ShowResolve /></ProtectedRoute>}/>

            {/* <Route path='/outageLocations' element={<OutageMap/>} /> */}

            {/* <Route path='/chartMenu' element={<ChartMenu/>} />
            <Route path='/locationticketchart' element={<TicketCountByLocation/>}/> */}
            {/* <Route path='/cityticketchart' element={<TicketCountByCityChart/>}/> */}
            {/* <Route path='/domainticketcharts' element={<DomainTicketChart/>}/>
            <Route path='/ticketstatuschart' element={<TicketStatusChart/>} /> 
            <Route path='/employeeavgresponsechart' element={<ResponseTimeChart/>}/>
            <Route path='/employeeavgresolutionchart' element={<AverageResolutionChart/>}/> */}
          </Routes>
        </BrowserRouter>
      </center>
      
    </div>
  );
}

export default App;
