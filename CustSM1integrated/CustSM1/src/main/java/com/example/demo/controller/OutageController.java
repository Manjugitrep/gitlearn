package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.OutageService;

@RestController
@RequestMapping(value="/outage")
public class OutageController {
    @Autowired
    private OutageService outageService;

    @GetMapping("/outages")
    public ResponseEntity<List<Object[]>> getOutageLocations() {
        try {
            List<Object[]> outages = outageService.getOutageLocations();
            if (outages.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(outages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
