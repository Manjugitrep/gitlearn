package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Faq;
import com.example.demo.model.Ticket;
import com.example.demo.repo.FaqRepository;
import com.example.demo.repo.TicketRepository;

@Service
public class ChatbotService {
	
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private FaqRepository faqRepository;
/**
 * @author Srihari.Palanivel
 * @param customerId
 * @return 
 */
    public String getTicketStatus(int customerId) {
        List<Ticket> tickets = ticketRepository.findByCustomer_CustomerId(customerId);
        if (tickets.isEmpty()) {
            return "No tickets available for you";
        }
        
        StringBuilder message = new StringBuilder("Your tickets: \n");
        for (Ticket ticket : tickets) {
            message.append("Ticket ID: ").append(ticket.getTicketId()).append("\n")
                         .append(", Status: ").append(ticket.getTicketStatus()).append("\n")
                         .append(", Reason : ").append(ticket.getTicketType()).append("\n")
                         .append(", Description : ").append(ticket.getTicketDescription()).append("\n")
                         .append("\n");
        }
        return message.toString();
    }

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }
}