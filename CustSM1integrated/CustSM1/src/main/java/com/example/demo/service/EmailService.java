package com.example.demo.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
 
@Service
public class EmailService {
 
    @Autowired
    private JavaMailSender javaMailSender; // Autowired JavaMailSender
    
    public void sendOtpEmail(String to, String otp) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Your OTP for Password Reset");
            helper.setText("Your OTP is: " + otp, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email", e);
        }
    }
 
    public String sendEmail(String toEmail, String subject, String body) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
 
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, false); // Set false to send plain text, change to true for HTML
 
            javaMailSender.send(mimeMessage);
            return "Email sent successfully to " + toEmail;
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Failed to send email: " + e.getMessage();
        }
    }
    
    public String sendTicketUpdateEmail(String toEmail, int ticketId, String oldStatus, String newStatus,
            Integer oldEmployeeId, Integer newEmployeeId,
            String oldTicketType, String newTicketType,
            String oldTicketPriority, String newTicketPriority) {
			String subject = "Update on Your Ticket #" + ticketId;
			StringBuilder body = new StringBuilder();
			body.append("Dear Customer,\n\n");
			body.append("Your ticket #" + ticketId + " has been updated:\n");
			
			if (!oldStatus.equals(newStatus)) {
			body.append(" - Status changed from '").append(oldStatus).append("' to '").append(newStatus).append("'\n");
			}
			
			if (oldEmployeeId != null && !oldEmployeeId.equals(newEmployeeId)) {
			body.append(" - Assigned Employee changed from '").append(oldEmployeeId).append("' to '").append(newEmployeeId).append("'\n");
			}
			
			if (oldTicketType != null && !oldTicketType.equals(newTicketType)) {
			body.append(" - Ticket Type changed from '").append(oldTicketType).append("' to '").append(newTicketType).append("'\n");
			}
			
			if (oldTicketPriority != null && !oldTicketPriority.equals(newTicketPriority)) {
			body.append(" - Ticket Priority changed from '").append(oldTicketPriority).append("' to '").append(newTicketPriority).append("'\n");
			}
			
			body.append("\nThank you for your patience.\n");
			
			return sendEmail(toEmail, subject, body.toString());
			}
}
