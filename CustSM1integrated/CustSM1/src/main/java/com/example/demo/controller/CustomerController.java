package com.example.demo.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import com.example.demo.model.Customer;
import com.example.demo.repo.CustomerRepository;
import com.example.demo.service.CustomerService;
import com.example.demo.service.EmailService;
import com.example.demo.service.OtpService;

@RestController
@Configuration
@RequestMapping(value="/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private BCryptPasswordEncoder bencoder;
	
	@Autowired
	private CustomerRepository customerRepository;
	
    @Autowired
    private CustomerService customerService;
    
    @GetMapping(value="/showCustomer")
    public List<Customer> showCustomer() {
        return customerService.showCustomer();
    }
 
    @GetMapping(value="/searchCustomer/{id}")
    public ResponseEntity<Customer> get(@PathVariable int id) {
        try {
            Customer customer = customerService.searchById(id);
            return new ResponseEntity<Customer>(customer, HttpStatus.OK);
        } catch(NoSuchElementException e) {
            return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(value="/searchByCustomerUserName/{user}")
    public ResponseEntity<Customer> getByUser(@PathVariable String user) {
        try {
            Customer customer = customerService.searchByUsername(user);
            return new ResponseEntity<Customer>(customer, HttpStatus.OK);
        } catch(NoSuchElementException e) {
            return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(value="/customerLogin/{user}/{pwd}")
	public ResponseEntity<?> login(@PathVariable String user, @PathVariable String pwd) {
	    Customer customer = customerService.login(user, pwd);
	    if (customer != null) {
	        return ResponseEntity.ok(customer);  // Return customer details
	    }
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}
    
    @GetMapping(value="/searchByCustomerPhno/{phno}")
    public ResponseEntity<Customer> getByPhoneNo(@PathVariable String phoneNo) {
        try {
            Customer customer = customerService.searchByCustomerPhno(phoneNo);
            return new ResponseEntity<Customer>(customer, HttpStatus.OK);
        } catch(NoSuchElementException e) {
            return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value="/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer request) {
        System.out.println("Received request: " + request.toString());
        try {
            // Validate fields
            if (request.getCustomerUsername() == null || request.getCustomerEmail() == null || 
                request.getCustomerPassword() == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }
            
            String result = customerService.addCustomer(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Internal server error");
        }
    }
    
    @PutMapping(value="/updateCustomer")
    public void updateCustomer(@RequestBody Customer customer) {
        customerService.updateCustomer(customer);
    }
    
    @DeleteMapping(value="/deleteCustomer/{id}")
    public void deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomer(id);
    }
    
    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        Optional<Customer> user = customerRepository.findByCustomerEmail(email);
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
	    Optional<Customer> user = customerRepository.findByCustomerEmail(email);
	    if (user.isEmpty()) {
	        return ResponseEntity.badRequest().body("Email not found");
	    }
 
	    // Hash the new password using the injected BCryptPasswordEncoder (bencoder)
	    String hashedPassword = bencoder.encode(newPassword);
 
	    Customer existingCustomer = user.get();  // Use 'Customer' instead of 'Employee'
	    existingCustomer.setCustomerPassword(hashedPassword);  // Assuming setCustomerPassword is available
	    customerRepository.save(existingCustomer);
 
	    otpService.clearOtp(email);  // If you have OTP clearing logic
	    return ResponseEntity.ok("Password updated successfully");
	}
 
   @PutMapping(value="/updateCustomerPassword/{customerUsername}")
   public ResponseEntity<String> updateCustomerPassword(@PathVariable String customerUsername, @RequestBody Customer customer) {
       // Find the existing customer by FirstName (or any unique identifier)
       Customer existingCustomer = customerService.searchByUsername(customerUsername);
 
       if (existingCustomer != null) {
           // Check if password update is required
           if (customer.getCustomerPassword() != null && !customer.getCustomerPassword().isEmpty()) {
               // Hash the new password
               String hashedPassword = bencoder.encode(customer.getCustomerPassword());
               existingCustomer.setCustomerPassword(hashedPassword);  // Set the hashed password
           }
 
           // Update the customer details in the database
           customerService.updateCustomer(existingCustomer);
           return ResponseEntity.ok("Customer Password updated successfully!");
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
       }
   }
}

