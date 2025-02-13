package com.example.demo.model;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="EMPLOYEE_ID")
    private int employeeId;
    
    @Column(name="EMPLOYEE_FIRSTNAME")
    private String employeeFirstName;
    
    @Column(name="EMPLOYEE_LASTNAME")
    private String employeeLastName;
    
    @Column(name="EMPLOYEE_DESIGNATION")
    private String employeeDesignation;
    
    @Column(name="EMPLOYEE_DEPT")
    private String employeeDept;
    
    @Column(name="EMPLOYEE_GENDER")
    private String employeeGender;
    
    @Column(name="EMPLOYEE_DOB")
    private Date employeeDob;
    
    @Column(name="EMPLOYEE_DOJ")
    private Date employeeDoj;
    
    @Column(name="EMPLOYEE_TAKEHOME")
    private double employeeTakeHome;
    
    @Column(name="EMPLOYEE_EMAIL")
    private String employeeEmail;
    
    @Column(name="EMPLOYEE_PHNO")
    private String employeePhNo;
    
    @Column(name="EMPLOYEE_PASSWORD")
    private String employeePassword;
    
    @Column(name="EMPLOYEE_MANAGER_ID")
    private Integer employeeManagerId; // Manager ID
}
