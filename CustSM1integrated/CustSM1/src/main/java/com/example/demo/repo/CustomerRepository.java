package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Customer;


@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Customer findByCustomerUsername(String customerUserName);
    long countByCustomerUsernameAndCustomerPassword(String customerUserName, String customerPassword);
    Customer findByCustomerPhno(String customerPhno);
    Optional<Customer> findByCustomerEmail(String customerEmail);
    
    boolean existsByCustomerEmail(String customerEmail);
    boolean existsByCustomerUsername(String customerUsername);
 
}
