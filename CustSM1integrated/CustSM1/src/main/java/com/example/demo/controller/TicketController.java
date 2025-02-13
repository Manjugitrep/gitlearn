package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Ticket;
import com.example.demo.service.TicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value="/ticket")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    @Autowired
    private TicketService ticketService;
    
    @GetMapping(value = "/showTicket")
    public List<Ticket> showTicket() {
        return ticketService.showTicket();
    }
    
    @GetMapping(value="/searchTicketByTicketId/{id}")
    public ResponseEntity<Ticket> get(@PathVariable int id) {
        try {
            Ticket ticket = ticketService.searchTicketByTicketId(id);
            return new ResponseEntity<Ticket>(ticket, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Ticket>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(value="/searchTicketByCustomerId/{customerId}")
    public ResponseEntity<List<Ticket>> searchTicketByCustomerId(@PathVariable int customerId) {
        List<Ticket> ticketList = ticketService.searchTicketByCustomerId(customerId);
        if(ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }
    
    @GetMapping(value="/searchTicketByEmployeeId/{employeeId}")
    public ResponseEntity<List<Ticket>> searchTicketByEmpId(@PathVariable int employeeId) {
        List<Ticket> ticketList = ticketService.searchTicketByEmployeeId(employeeId);
        if(ticketList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }
    
    @GetMapping("/searchTicketByStatus/{status}")
    public ResponseEntity<List<Ticket>> searchTicketByStatus(@PathVariable String status) {
        List<Ticket> tickets = ticketService.searchTicketByStatus(status);
        return tickets.isEmpty() ?
            new ResponseEntity<>(HttpStatus.NOT_FOUND) :
            new ResponseEntity<>(tickets, HttpStatus.OK);
    }
    
    @PostMapping(value = "/addTicket")
    public ResponseEntity<Ticket> createTicket(@Valid @RequestBody Ticket ticket) {
        try {
            Ticket createdTicket = ticketService.addTicket(ticket);
            return new ResponseEntity<>(createdTicket, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/updateTicket/{ticketId}")
	public ResponseEntity<String> updateTicketDetails(
	        @PathVariable int ticketId,
	        @RequestParam(required = false) String newStatus,
	        @RequestParam(required = false) Integer newEmployeeId,
	        @RequestParam(required = false) String newTicketType,
	        @RequestParam(required = false) String newTicketPriority) {
 
	    String response = ticketService.updateTicketDetails(ticketId, newStatus, newEmployeeId, newTicketType, newTicketPriority);
	    return ResponseEntity.ok(response);
	}
    
 // API endpoint to fetch ticket counts by state
    @GetMapping("/countByLocation")
    public ResponseEntity<List<Map<String, Object>>> getTicketCountByLocation() {
        return ResponseEntity.ok(ticketService.getTicketCountByLocation());
    }
    
    @GetMapping("/countByLocationCity")
    public ResponseEntity<List<Map<String, Object>>> getTicketCountByLocationCity() {
        return ResponseEntity.ok(ticketService.getTicketCountByLocation());
    }
    
    
    
   //graphs
    @GetMapping("/countByDept")
    public List<Map<String, Object>> getTicketCountByDept() {
        return ticketService.getTicketCountByDept();
    }    
    
    
    @GetMapping("/open/count")
    public long getOpenTicketCount() {
        return ticketService.getOpenTicketCount();
    }
 
    // Endpoint to get count of Closed tickets
    @GetMapping("/closed/count")
    public long getClosedTicketCount() {
        return ticketService.getClosedTicketCount();
    }
 
    // Endpoint to get count of In Progress tickets
    @GetMapping("/pending/count")
    public long getPendingTicketCount() {
        return ticketService.getPendingTicketCount();
    }
    @GetMapping("/averageresponsetime")
    public Map<Integer, Double> getAverageResponseTimes() {
        return ticketService.getAverageResponseTimePerEmployee();
    }
    
    @DeleteMapping(value="/deleteTicketById/{ticketId}")
    public ResponseEntity<Void> deleteTicket(@PathVariable int ticketId) {
        try {
            ticketService.deleteTicketByTicketId(ticketId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
