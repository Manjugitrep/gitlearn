package com.example.demo.service;
 
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Service;
 
@Service
public class OtpService {
    private final Map<String, String> otpStorage = new HashMap<>();
    private final Random random = new Random();
 
    public String generateOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000)); // 6-digit OTP
        otpStorage.put(email, otp);
        return otp;
    }
    
    public void clearOtp(String email) {
        otpStorage.remove(email);
    }
 
 
    public boolean validateOtp(String email, String enteredOtp) {
        return otpStorage.containsKey(email) && otpStorage.get(email).equals(enteredOtp);
    }
}