package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Customer;
import com.example.demo.model.Resolve;
import com.example.demo.model.Ticket;
import com.example.demo.repo.CustomerRepository;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.repo.ResolveRepository;
import com.example.demo.repo.TicketRepository;

import jakarta.transaction.Transactional;

/**
 * @author Swetha.N
 * 
 */


@Service
@Transactional
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ResolveRepository resolveRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
	private EmailService emailService;
    
    private int roundRobinIndex = 0;
    
    public List<Ticket> showTicket() {
        return ticketRepository.findAll();
    }
    
    public Ticket searchTicketByTicketId(int ticketId) {
        return ticketRepository.findById(ticketId).get();
    }
    
    public List<Ticket> searchTicketByCustomerId(int customerId) {
        return ticketRepository.findByCustomer_CustomerId(customerId);
    }
    
    public List<Ticket> searchTicketByEmployeeId(int employeeId) {
        return ticketRepository.findByEmployeeId(employeeId);
    }
    
//    public Ticket addTicket(Ticket ticket) {
//    	
//    	// Set ticket priority
//        ticket.setTicketPriority(assignPriority(ticket.getTicketType()));
//        // Set ticket status to "PENDING" by default
//        ticket.setTicketStatus("Pending");
//        
//        if (ticket.getCustomer() == null) {
//            throw new IllegalArgumentException("Ticket must have a customer associated with it");
//        }
//
//        if (ticket.getTicketRaiseDate() == null) {
//            ticket.setTicketRaiseDate(LocalDateTime.now());
//        }
//
//        Customer customer = customerRepository.findById(ticket.getCustomer().getCustomerId())
//            .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
//        
//        ticket.setCustomer(customer);
//        
//        Ticket savedTicket = ticketRepository.save(ticket);
//    
//        // Send email notification to the customer
//        String emailSubject = "Ticket Raised Successfully";
//        String emailBody = "Dear " + ticket.getCustomer().getCustomerFirstname() + ",\n\n" +
//                "Your ticket has been successfully raised. Our team will get back to you shortly.\n\n" +
//                "Ticket Details:\n" +
//                "Ticket ID: " + ticket.getTicketId() + "\n" +
//                "Issue: " + ticket.getTicketDescription() + "\n\n" +
//                "Thank you for contacting us.";
// 
//        emailService.sendEmail(ticket.getCustomer().getCustomerEmail(), emailSubject, emailBody);
// 
//       System.err.println("email send successfully......");
//       return savedTicket;
//        
//    }
    
    public Ticket addTicket(Ticket ticket) {
        
        // Set ticket priority
        ticket.setTicketPriority(assignPriority(ticket.getTicketType()));
        // Set ticket status to "Pending" by default
        ticket.setTicketStatus("PENDING");

        if (ticket.getCustomer() == null) {
            throw new IllegalArgumentException("Ticket must have a customer associated with it");
        }

        if (ticket.getTicketRaiseDate() == null) {
            ticket.setTicketRaiseDate(LocalDateTime.now());
        }

        Customer customer = customerRepository.findById(ticket.getCustomer().getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        ticket.setCustomer(customer);

        // Fetch all employees of the required department
        List<Integer> eligibleEmployees = employeeRepository.findEmployeeIdsByDepartment(ticket.getTicketType());

        if (eligibleEmployees.isEmpty()) {
            throw new RuntimeException("No employees available for ticket type: " + ticket.getTicketType());
        }

        // Step 1: Find employees with the least number of total tickets
        Integer minTicketsEmployee = eligibleEmployees.stream()
                .min(Comparator.comparingInt(empId -> ticketRepository.countByEmployeeId(empId)))
                .orElse(null);

        List<Integer> leastLoadedEmployees = eligibleEmployees.stream()
                .filter(empId -> ticketRepository.countByEmployeeId(empId)
                        == ticketRepository.countByEmployeeId(minTicketsEmployee))
                .collect(Collectors.toList());

        // Step 2: Find employees with the least number of OPEN tickets
        Integer minOpenTicketsEmployee = leastLoadedEmployees.stream()
                .min(Comparator.comparingInt(empId -> ticketRepository.countByEmployeeIdAndTicketStatus(empId, "OPEN")))
                .orElse(null);

        List<Integer> leastOpenEmployees = leastLoadedEmployees.stream()
                .filter(empId -> ticketRepository.countByEmployeeIdAndTicketStatus(empId, "OPEN")
                        == ticketRepository.countByEmployeeIdAndTicketStatus(minOpenTicketsEmployee, "OPEN"))
                .collect(Collectors.toList());

        // Step 3: Assign based on priority distribution
        Integer assignedEmployee = leastOpenEmployees.stream()
                .min(Comparator.comparingInt(empId -> ticketRepository.countByEmployeeIdAndPriority(empId, "LOW")))
                .orElseGet(() -> leastOpenEmployees.stream()
                        .min(Comparator.comparingInt(empId -> ticketRepository.countByEmployeeIdAndPriority(empId, "MEDIUM")))
                        .orElse(null));

        // Step 4: Apply round-robin if all conditions match
        if (assignedEmployee == null) {
            int nextIndex = (roundRobinIndex % leastOpenEmployees.size());
            assignedEmployee = leastOpenEmployees.get(nextIndex);
            roundRobinIndex++;
        }

        // Assign ticket to the selected employee
        ticket.setEmployeeId(assignedEmployee);

        Ticket savedTicket = ticketRepository.save(ticket);

        // Send email notification to the customer
        String emailSubject = "Ticket Raised Successfully";
        String emailBody = "Dear " + ticket.getCustomer().getCustomerFirstname() + ",\n\n" +
                "Your ticket has been successfully raised. Our team will get back to you shortly.\n\n" +
                "Ticket Details:\n" +
                "Ticket ID: " + ticket.getTicketId() + "\n" +
                "Assigned Employee ID: " + assignedEmployee + "\n" +
                "Issue: " + ticket.getTicketDescription() + "\n\n" +
                "Thank you for contacting us.";

        emailService.sendEmail(ticket.getCustomer().getCustomerEmail(), emailSubject, emailBody);

        System.err.println("Email sent successfully......");
        return savedTicket;
    }


    
    private String assignPriority(String ticketType) {
        return switch (ticketType.toLowerCase()) {
            case "OUTAGE" -> "HIGH";
            case "INSTALLATION_AND_SERVICE", "TECHNICAL_SUPPORT", "RELOCATION_REQUEST" -> "MEDIUM";
            case "BILLING_AND_ACCOUNTS" ,"PRODUCT_AND_PLANS"-> "LOW";
            case "OTHER" -> "LOW";
            default -> "LOW";
        };
    }
    
    
    
    public List<Ticket> searchTicketByStatus(String ticketStatus) {
        List<Ticket> tickets = ticketRepository.findUnresolvedTicketsByStatus(ticketStatus);
        
        if ("CLOSED".equalsIgnoreCase(ticketStatus)) {
            for (Ticket ticket : tickets) {
                if (!resolveRepository.existsByTicketId(ticket.getTicketId())) {
                    Resolve resolve = new Resolve();
                    resolve.setTicketId(ticket.getTicketId());
                    resolve.setEmployeeId(ticket.getEmployeeId());
                    
                    LocalDateTime resolveDate = LocalDateTime.now();
                    LocalDateTime raiseDate = ticket.getTicketRaiseDate();
                    
                    // Calculate days between raise date and resolve date
                    int turnAroundDays = (int) ChronoUnit.DAYS.between(raiseDate, resolveDate);
                    
                    resolve.setResolveDate(resolveDate);
                    resolve.setEmployeeDescription("Ticket closed automatically");
                    resolve.setTurnAroundTime(turnAroundDays);
                    resolve.setDelayReason(turnAroundDays > 7 ? "Exceeded SLA" : "N/A");
                    
                    resolveRepository.save(resolve);
                }
            }
        }
        return tickets;
    }
 
    
    
    //update ticket
    public String updateTicketDetails(int ticketId, String newStatus, Integer newEmployeeId, String newTicketType, String newTicketPriority) {
	    Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
	    if (!optionalTicket.isPresent()) {
	        return "Ticket not found!";
	    }
 
	    Ticket ticket = optionalTicket.get();
	    String oldStatus = ticket.getTicketStatus();
	    Integer oldEmployeeId = ticket.getEmployeeId();
	    String oldTicketType = ticket.getTicketType();
	    String oldTicketPriority = ticket.getTicketPriority();
 
	    boolean isStatusChanged = (oldStatus == null ? newStatus != null : !oldStatus.equals(newStatus));
	    boolean isEmployeeChanged = (newEmployeeId != null && (oldEmployeeId == null ? newEmployeeId != null : !oldEmployeeId.equals(newEmployeeId)));
	    boolean isTicketTypeChanged = (oldTicketType == null ? newTicketType != null : !oldTicketType.equals(newTicketType));
	    boolean isTicketPriorityChanged = (oldTicketPriority == null ? newTicketPriority != null : !oldTicketPriority.equals(newTicketPriority));
 
	    boolean anyChange = isStatusChanged || isEmployeeChanged || isTicketTypeChanged || isTicketPriorityChanged;
 
	    if (isStatusChanged) ticket.setTicketStatus(newStatus);
	    if (isEmployeeChanged) ticket.setEmployeeId(newEmployeeId);
	    if (isTicketTypeChanged) ticket.setTicketType(newTicketType);
	    if (isTicketPriorityChanged) ticket.setTicketPriority(newTicketPriority);
 
	    if (anyChange) {
	        ticketRepository.save(ticket);
	        emailService.sendTicketUpdateEmail(
	            ticket.getCustomer().getCustomerEmail(), ticketId, oldStatus, newStatus,
	            oldEmployeeId, newEmployeeId, oldTicketType, newTicketType,
	            oldTicketPriority, newTicketPriority
	        );
	    }
 
	    return "Ticket details updated successfully!";
	}
    
   //location state vs no.of tickets
    public List<Map<String, Object>> getTicketCountByLocation() {
        List<Object[]> results = ticketRepository.getTicketCountByLocation();
        List<Map<String, Object>> data = new ArrayList<>();
 
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("location", row[0]);
            map.put("ticketCount", row[1]);
            data.add(map);
        }
        return data;
    }
    

    // Get ticket count grouped by state and city
    public Map<String, List<Map<String, Object>>> getTicketCountByStateAndCity() {
        List<Object[]> results = ticketRepository.getTicketCountByStateAndCity();
        Map<String, List<Map<String, Object>>> stateCityMap = new HashMap<>();

        for (Object[] row : results) {
            String state = (String) row[0];
            String city = (String) row[1];
            Long ticketCount = (Long) row[2];

            // Add ticket count to the state-city map
            stateCityMap.computeIfAbsent(state, k -> new ArrayList<>())
                        .add(Map.of("city", city, "ticketCount", ticketCount));
        }

        return stateCityMap;
    }

   
    //domain vs tickets
    public List<Map<String, Object>> getTicketCountByDept() {
        List<Object[]> results = ticketRepository.countTicketsByEmployeeDept();
        List<Map<String, Object>> formattedResults = new ArrayList<>();
        
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("employeeDept", row[0]);
            map.put("ticketCount", row[1]);
            formattedResults.add(map);
        }
        
        return formattedResults;
    }
    
    
 // Get count of Open tickets
    public long getOpenTicketCount() {
        return ticketRepository.countTicketsByOpenStatus();
    }
 
    // Get count of Closed tickets
    public long getClosedTicketCount() {
        return ticketRepository.countTicketsByClosedStatus();
    }
 
    // Get count of In Progress tickets
    public long getPendingTicketCount() {
        return ticketRepository.countTicketsByPendingStatus();
    }
    
    //avg response of employee
    public Map<Integer, Double> getAverageResponseTimePerEmployee() {
        List<Object[]> result = ticketRepository.findAverageResponseTimeByEmployee();
        Map<Integer, Double> averageResponseTimes = new HashMap<>();

        for (Object[] row : result) {
            Integer employeeId = (Integer) row[0];
            Double avgResponseTime = (Double) row[1];
            averageResponseTimes.put(employeeId, avgResponseTime);
        }
        
        return averageResponseTimes;
    }
   
    
    public void deleteTicketByTicketId(int ticId) {
        ticketRepository.deleteById(ticId);
    }
}