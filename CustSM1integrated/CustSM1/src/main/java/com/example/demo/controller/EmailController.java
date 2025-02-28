package com.example.demo.controller;
 
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/email")
public class EmailController {
 
    @Autowired
    private EmailService emailService;
 
    @PostMapping("/send")
    public String sendEmail(@RequestParam String toEmail,
                            @RequestParam String subject,
                            @RequestParam String body) {
        return emailService.sendEmail(toEmail, subject, body);
    }
}