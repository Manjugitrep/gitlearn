package com.example.demo.repo;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByCustomer_CustomerId(int customerId);
    List<Ticket> findByEmployeeId(int employeeId);
    List<Ticket> findByTicketStatus(String ticketStatus);
    
    @Query("SELECT t.customer.customerPincode AS pincode, t.customer.customerAddress AS address, " +
           "t.customer.customerLatitude AS latitude, t.customer.customerLongitude AS longitude, " +
           "COUNT(t) AS count " +
           "FROM Ticket t WHERE t.ticketPriority = 'HIGH' GROUP BY t.customer.customerPincode, " +
           "t.customer.customerAddress, t.customer.customerLatitude, t.customer.customerLongitude " +
           "HAVING COUNT(t) > 2")
    List<Object[]> findOutageLocations();
    
    @Query("SELECT t FROM Ticket t WHERE t.ticketStatus = ?1 AND NOT EXISTS " +
           "(SELECT r FROM Resolve r WHERE r.ticketId = t.ticketId)")
    List<Ticket> findUnresolvedTicketsByStatus(String ticketStatus);
    
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.employeeId = :employeeId")
    int countByEmployeeId(@Param("employeeId") Integer employeeId);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.employeeId = :employeeId AND t.ticketStatus = :status")
    int countByEmployeeIdAndTicketStatus(@Param("employeeId") Integer employeeId, @Param("status") String status);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.employeeId = :employeeId AND t.ticketPriority = :priority")
    int countByEmployeeIdAndPriority(@Param("employeeId") Integer employeeId, @Param("priority") String priority);
    
    //state vs tickets
    @Query("SELECT c.customerState, COUNT(t.ticketId) FROM Ticket t JOIN t.customer c GROUP BY c.customerState")
    List<Object[]> getTicketCountByLocation();
    
    // Query to get ticket count grouped by state and city(cust_location vs tickets )
    @Query("SELECT c.customerState, c.customerCity, COUNT(t.ticketId) " +
           "FROM Ticket t JOIN t.customer c " +
           "GROUP BY c.customerState, c.customerCity")
    List<Object[]> getTicketCountByStateAndCity();
    
   
    //domain vs no of tickets
    @Query("SELECT e.employeeDept, COUNT(t) FROM Employee e JOIN Ticket t ON e.employeeId = t.employeeId GROUP BY e.employeeDept")
    List<Object[]> countTicketsByEmployeeDept();
    
    
 // Count tickets with 'Open' status
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.ticketStatus = 'Open'")
    long countTicketsByOpenStatus();

    // Count tickets with 'Closed' status
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.ticketStatus = 'Closed'")
    long countTicketsByClosedStatus();

    // Count tickets with 'In Progress' status
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.ticketStatus = 'Pending'")
    long countTicketsByPendingStatus();
    
    //avg response time of each employee
    @Query("SELECT e.employeeId, AVG(TIMESTAMPDIFF(SECOND, t.ticketRaiseDate, t.responseTime)) " +
            "FROM Ticket t " +
            "JOIN Employee e ON e.employeeId = t.employeeId " +
            "WHERE t.ticketStatus = 'open' " +
            "GROUP BY e.employeeId")
     List<Object[]> findAverageResponseTimeByEmployee();

}

    
    
    












