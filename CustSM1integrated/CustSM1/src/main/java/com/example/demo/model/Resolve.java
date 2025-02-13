package com.example.demo.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "RESOLVE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resolve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESOLVE_ID")
    private int resolveId;
    
    @Column(name = "TICKET_ID")
    private int ticketId;
    
    @Column(name = "EMPLOYEE_ID")
    private int employeeId;
    
    @Column(name = "RESOLVE_DATE")
    private LocalDateTime resolveDate;
    
    @Column(name = "EMPLOYEE_DESCRIPTION")
    private String employeeDescription;
    
    @Column(name = "TURN_AROUND_TIME")
    private int turnAroundTime;
    
    @Column(name = "DELAY_REASON")
    private String delayReason;
    
}