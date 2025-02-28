package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Faq;
import com.example.demo.service.ChatbotService;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {
    @Autowired
    private ChatbotService chatbotService;
    
    @GetMapping("/ticketstatus/{customerId}")
    public ResponseEntity<String> getTicketStatus(@PathVariable int customerId) {
        try {
            String status = chatbotService.getTicketStatus(customerId);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Error retrieving ticket status");
        }
    }
    
    @GetMapping("/faqs")
    public ResponseEntity<List<Faq>> getFaqs() {
        try {
            List<Faq> faqs = chatbotService.getAllFaqs();
            if (faqs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(faqs, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}