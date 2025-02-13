package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repo.TicketRepository;

@Service
public class OutageService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Object[]> getOutageLocations() {
        return ticketRepository.findOutageLocations();
    }
}
