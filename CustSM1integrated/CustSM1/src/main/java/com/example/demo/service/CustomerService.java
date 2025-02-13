package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Customer;
import com.example.demo.repo.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private BCryptPasswordEncoder bencoder;
    
    @Autowired
    private RestTemplate restTemplate;
    
    public List<Customer> showCustomer() {
        return customerRepository.findAll();
    }
    
    public Customer searchById(int id) {
        return customerRepository.findById(id).get();
    }
    
    public Customer searchByUsername(String userName) {
        return customerRepository.findByCustomerUsername(userName);
    }
    
    public Customer login(String customerUserName, String customerPassword) {
	    Customer customer = customerRepository.findByCustomerUsername(customerUserName);
 
	    if (customer != null && bencoder.matches(customerPassword, customer.getCustomerPassword())) {
	        return customer;  // Return the full customer object instead of "1"
	    }
 
	    return null;  // Return null if credentials are invalid
	}
    
    public Customer searchByCustomerPhno(String customerPhno) {
        return customerRepository.findByCustomerPhno(customerPhno);
    }
    
    public String addCustomer(Customer customer) {
        customer.setCustomerPassword(bencoder.encode(customer.getCustomerPassword()));
        customerRepository.save(customer);
        return "User Added Successfully";
    }
    
    public void updateCustomer(Customer customer) {
        customerRepository.save(customer);
    }
    
    public void deleteCustomer(int customerId) {
        customerRepository.deleteById(customerId);
    }
}
