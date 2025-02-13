package com.example.demo.repo;
 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Resolve;
 
public interface ResolveRepository extends JpaRepository<Resolve, Integer>{
	
	Resolve findByTicketId(int ticketId);
	List<Resolve> findByEmployeeId(int employeeId);
	boolean existsByTicketId(int ticketId);
	
	 // Query to calculate average resolution time per employee by joining Resolve, Ticket, and Employee tables
    @Query("SELECT e.employeeId, e.employeeFirstName, e.employeeLastName, " +
           "AVG(TIMESTAMPDIFF(SECOND, t.ticketRaiseDate, r.resolveDate) / 3600) " + // Calculate in hours
           "FROM Resolve r " +
           "JOIN Employee e ON r.employeeId = e.employeeId " +
           "JOIN Ticket t ON r.ticketId = t.ticketId " +
           "GROUP BY e.employeeId, e.employeeFirstName, e.employeeLastName")
    List<Object[]> findAverageResolutionTimeWithEmployeeInfo();
}