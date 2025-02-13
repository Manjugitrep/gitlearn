package com.example.demo.controller;
 
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.JwtService;
import com.example.demo.model.AuthRequest;
import com.example.demo.model.Employee;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.OtpService;
import com.example.demo.service.UserDataDetails;
 
 
 
@RestController
@RequestMapping(value="/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private EmployeeRepository employeeRepository;
 
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
    private JwtService jwtService;
 
    @Autowired
    private AuthenticationManager authenticationManager;
    
	@GetMapping(value="/showEmployee")
	public List<Employee> showEmployee(){
		return employeeService.showEmployee();
	}
	
	@GetMapping(value="/searchEmployee/{id}")
	public ResponseEntity<Employee> get(@PathVariable int id){
		try {
			Employee employee = employeeService.searchById(id);
			return new ResponseEntity<Employee>(employee,HttpStatus.OK);
			
		}catch(NoSuchElementException e){
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/searchEmployeeEmail/{username}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String username) {
        Optional<Employee> employee = employeeService.searchByEmployeeEmail(username);
        return employee.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	
	@GetMapping("/searchByManagerId/{employeeManagerId}")
    public ResponseEntity<?> getEmployeesByManagerId(@PathVariable int employeeManagerId) {
        List<Employee> employees = employeeService.findByManagerId(employeeManagerId);
        if (employees.isEmpty()) {
            return new ResponseEntity<>("No employees found under this manager.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
	
	@GetMapping(value="/searchByEmployeeFirstName/{employeeFirstName}")
	public ResponseEntity<Employee> getName(@PathVariable String employeeFirstName){
		try {
			Employee employee = employeeService.searchByFirstName(employeeFirstName);
			return new ResponseEntity<Employee>(employee,HttpStatus.OK);
			
		}catch(NoSuchElementException e){
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping(value="/employeeLogin/{firstName}/{pwd}")
	public String login(@PathVariable String firstName,@PathVariable String pwd) {
		return employeeService.login(firstName, pwd);
	}
	
	@GetMapping(value="/searchByEmployeePhNo/{employeePhNo}")
	public ResponseEntity<Employee> getNo(@PathVariable String employeePhNo){
		try {
			Employee employee = employeeService.searchByEmployeePhNo(employeePhNo);
			return new ResponseEntity<Employee>(employee,HttpStatus.OK);
			
		}catch(NoSuchElementException e){
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping(value="/addEmployee")
	public void addEmployee(@RequestBody Employee employee) {
		employeeService.addEmployee(employee);
	}
	
	@DeleteMapping(value="/deleteEmployee/{id}")
	public  ResponseEntity<Employee> deleteEmployee(@PathVariable int id){
		try {
			employeeService.searchById(id);
			employeeService.deleteEmployee(id);
			return new ResponseEntity<Employee>(HttpStatus.OK);
			
		}catch(NoSuchElementException e) {
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping(value="/updateEmployee")
	public  ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
		try {
			employeeService.searchById(employee.getEmployeeId());
			employeeService.updateEmployee(employee);
			return new ResponseEntity<Employee>(HttpStatus.OK);
			
		}catch(NoSuchElementException e) {
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<String> adminProfile() {
        try {
            // Some business logic here (e.g., fetch user data)
            return new ResponseEntity<>("Welcome to Admin Profile", HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exception that might occur during the method execution
            return new ResponseEntity<>("Error occurred while processing the Admin profile", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
    @GetMapping("/manager/managerProfile")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<String> managerProfile() {
        try {
            // Some business logic here (e.g., fetch user data)
            return new ResponseEntity<>("Welcome to Manager Profile", HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exception that might occur during the method execution
            return new ResponseEntity<>("Error occurred while processing the Manager profile", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
    @GetMapping("/employee/employeeProfile")
    @PreAuthorize("hasAuthority('Employee')")
    public ResponseEntity<String> employeeProfile() {
        try {
            // Some business logic here (e.g., fetch user data)
            return new ResponseEntity<>("Welcome to Employee Profile", HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exception that might occur during the method execution
            return new ResponseEntity<>("Error occurred while processing the Employee profile", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	 @PostMapping("/generateToken")
	    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		
		 UserDataDetails userDetails = (UserDataDetails) employeeService.loadUserByUsername(authRequest.getUsername());
		
 
		     System.out.println("reached");
		     System.out.println(authRequest.getDesignation());
	        // Check if the provided role matches the stored role
	        if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority(authRequest.getDesignation()))) {
	        	  System.out.println("error");
	            throw new BadCredentialsException("Invalid role provided!");
	        }
		
	        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
	        if (authentication.isAuthenticated()) {
	            return jwtService.generateToken(authRequest.getUsername());
	        } else {
	        	  System.out.println("invalid");
	            throw new UsernameNotFoundException("invalid user request !");
	        }
	  }
	  
	        @PostMapping("/forgotpassword")
	   	 public ResponseEntity<String> forgotPassword(@RequestParam String email) {
	   		 System.out.println("Received email: " + email);  
	   	     Optional<Employee> user = employeeRepository.findByEmployeeEmail(email);
	   	     if (user.isEmpty()) {
	   	         return ResponseEntity.badRequest().body("Email not found");
	   	     }
	   	     String otp = otpService.generateOtp(email);
	   	     emailService.sendOtpEmail(email, otp);
	   	     return ResponseEntity.ok("OTP sent to your email");
	   	 }
	   	
	   	 @PostMapping("/validateotp")
	   	    public ResponseEntity<String> validateOtp(@RequestParam String email, @RequestParam String otp) {
	   		  System.out.println("Received email: " + email);
	   		    System.out.println("Received OTP: " + otp);
	   	        if (otpService.validateOtp(email, otp)) {
	   	            return ResponseEntity.ok("OTP is valid");
	   	        } else {
	   	            return ResponseEntity.badRequest().body("Invalid OTP");
	   	        }
	       }
	   	
	   	 @PostMapping("/resetpassword")
	   	 public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
	   	     Optional<Employee> user = employeeRepository.findByEmployeeEmail(email);
	   	     if (user.isEmpty()) {
	   	         return ResponseEntity.badRequest().body("Email not found");
	   	     }
	    
	   	     // Hash the new password using the injected PasswordEncoder
	   	     String hashedPassword = encoder.encode(newPassword);
	    
	   	     Employee existingEmployee = user.get();
	   	     existingEmployee.setEmployeePassword(hashedPassword);
	   	     employeeRepository.save(existingEmployee);
	    
	   	     otpService.clearOtp(email);  // If you have OTP clearing logic
	   	     return ResponseEntity.ok("Password updated successfully");
	   	 }
	   	
	   	
	   	 @PutMapping(value="/updateEmployeePassword/{employeeEmail}")
	   	 public ResponseEntity<String> updateEmployeePassword(@PathVariable String employeeEmail, @RequestBody Employee employee) {
	   	     // Find the existing employee by employeeEmail (the unique identifier)
	   	     Optional<Employee> existingEmployeeOptional = employeeService.searchByEmployeeEmail(employeeEmail);
	    
	   	     if (existingEmployeeOptional.isPresent()) {
	   	         // Get the actual Employee object
	   	         Employee existingEmployee = existingEmployeeOptional.get();
	    
	   	         // Check if password update is required
	   	         if (employee.getEmployeePassword() != null && !employee.getEmployeePassword().isEmpty()) {
	   	             // Hash the new password
	   	             String hashedPassword = encoder.encode(employee.getEmployeePassword());
	   	             existingEmployee.setEmployeePassword(hashedPassword);  // Set the hashed password
	   	         }
	    
	   	         // Update the employee details in the database
	   	         employeeService.updateEmployee(existingEmployee);
	   	         return ResponseEntity.ok("Employee Password updated successfully!");
	   	     } else {
	   	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
	   	     }
	   	 
	    }
}