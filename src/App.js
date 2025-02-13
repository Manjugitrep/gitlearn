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

function App() {
  return (
    <div className="App">
      <center>
        {/* <h2>Customer Service Management</h2> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/aboutUs' element={<AboutUs/>} />
            <Route path='/customerLogin' element={<CustomerLogin/>} />
            <Route path='/customerMenu' element={<CustomerMenu/>} />
            <Route path='/customerInfo' element={<CustomerInfo/>} />
            <Route path='/customerTickets' element={<CustomerTickets/>} />
            <Route path='/updateCustomer' element={<UpdateCustomer/>} />
            <Route path='/addTicket' element={<AddTicket/>} />
            <Route path='/chatbot' element={<Chatbot/>} />


            <Route path='/employeeLogin' element={<EmployeeLogin/>} />
            <Route path='/employeeMenu' element={<EmployeeMenu/>} />
            <Route path='/adminMenu' element={<AdminMenu/>} />
            <Route path='/employeeInfo' element={<EmployeeInfo/>} />
            <Route path='/showEmployee' element={<ShowEmployee/>} />
            <Route path='/addEmployee' element={<AddEmployee/>} />
            <Route path='/updateEmployee' element={<UpdateEmployee />} />
            <Route path='/employeeTickets' element={<EmployeeTickets/>} />
            <Route path='/showCustomer' element={<ShowCustomer />} />
            <Route path='/showTicket' element={<ShowTicket/>} />
            <Route path='/showResolve' element={<ShowResolve />} />

          </Routes>
        </BrowserRouter>
      </center>
      
    </div>
  );
}

export default App;
