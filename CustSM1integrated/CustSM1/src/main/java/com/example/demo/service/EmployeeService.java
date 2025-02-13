package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.repo.EmployeeRepository;
import com.example.demo.model.Employee;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService implements UserDetailsService{
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private BCryptPasswordEncoder bencoder;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public List<Employee> showEmployee() {
		return employeeRepository.findAll();
	}
	
	public Employee searchByFirstName(String employeeFirstName) {
		return employeeRepository.findByEmployeeFirstName(employeeFirstName);
		}
 
	public Employee searchById(int id) {
		return employeeRepository.findById(id).get();
	}
	
	public List<Employee> findByManagerId(int employeeManagerId) {
        return employeeRepository.findByEmployeeManagerId(employeeManagerId);
    }
	
	public String login(String employeeFirstName, String employeePassword) {
		long count= employeeRepository.countByEmployeeFirstNameAndEmployeePassword(employeeFirstName, employeePassword);
		String res ="";
		res+=count;
		return res;
	}
	
	
	public Optional<Employee> searchByEmployeeEmail(String username) {
		return employeeRepository.findByEmployeeEmail(username);
	}
	
	public Employee searchByEmployeePhNo(String employeePhNo) {
		return employeeRepository.findByEmployeePhNo(employeePhNo);
	}
	
	
	public String addEmployee (Employee employee) {
		
		 // Store the original password before encoding
	    String originalPassword = employee.getEmployeePassword();
	    
		employee.setEmployeePassword(encoder.encode(originalPassword));
		employeeRepository.save(employee);
		
		// Prepare email content
       String subject = "Welcome to the Company - Your Credentials";
       String body = "Dear " + employee.getEmployeeFirstName() + ",\n\n"
               + "Welcome to the company!\n\n"
               + "Your login credentials are:\n"
               + " - Email: " + employee.getEmployeeEmail() + "\n"
               + " - Password: " + originalPassword + "\n\n"
               + "Please change your password after logging in.\n\n"
               + "Best Regards,\nHR Team";

       // Send email with credentials
       emailService.sendEmail(employee.getEmployeeEmail(), subject, body);
		return "User Added Successfully";
	}
	
	
	public void updateEmployee (Employee employee) {
		employeeRepository.save(employee);
	}
	
	public void deleteEmployee (int empno) {
		employeeRepository.deleteById(empno);
	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Employee> userDetail = employeeRepository.findByEmployeeEmail(username);
		return userDetail.map(UserDataDetails :: new)
				.orElseThrow( () -> new UsernameNotFoundException("User Not Found" +username));
				
	}
	
}
