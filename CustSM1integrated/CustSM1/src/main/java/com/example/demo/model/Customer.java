package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CUSTOMER_ID")  
    private int customerId;
    
    @Column(name="CUSTOMER_FIRSTNAME")
    private String customerFirstname;
    
    @Column(name="CUSTOMER_LASTNAME")
    private String customerLastname;
    
    @Column(name="CUSTOMER_ADDRESS")
    private String customerAddress;
    
    @Column(name="CUSTOMER_PINCODE")
    private String customerPincode;
    
    @Column(name="CUSTOMER_GENDER")
    private String customerGender;
    
    @Column(name="CUSTOMER_USERNAME")
    private String customerUsername;
    
    @Column(name="CUSTOMER_PASSWORD")
    private String customerPassword;
    
    @Column(name="CUSTOMER_EMAIL")
    private String customerEmail;
    
    @Column(name="CUSTOMER_PHNO")
    private String customerPhno;
    
    @Column(name="CUSTOMER_LATITUDE")
    private double customerLatitude;
    
    @Column(name="CUSTOMER_LONGITUDE") 
    private double customerLongitude;
    
    @Column(name="CUSTOMER_CITY") 
    private String customerCity;
    
    @Column(name="CUSTOMER_STATE") 
    private String customerState;
}
