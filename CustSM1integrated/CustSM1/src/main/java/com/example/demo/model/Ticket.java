package com.example.demo.model;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="TICKET")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="TICKET_ID")
    private int ticketId;
    
    @Column(name="EMPLOYEE_ID")
    private int employeeId;
    
    @Column(name="TICKET_TYPE")
    private String ticketType;
    
    @Column(name="TICKET_DESCRIPTION")
    private String ticketDescription;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name="TICKET_RAISEDATE",nullable=false)
    private LocalDateTime ticketRaiseDate;
    
    @Column(name="TICKET_STATUS")
    private String ticketStatus;
    
    @Column(name="TICKET_PRIORITY")
    private String ticketPriority;
    
    @Column(name="RESPONSE_TIME")
    private LocalDateTime responseTime;
    
    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID", referencedColumnName = "CUSTOMER_ID",nullable=false)
    private Customer customer;
}