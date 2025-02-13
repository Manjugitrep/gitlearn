package com.example.demo.service;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Resolve;
import com.example.demo.repo.ResolveRepository;

import jakarta.transaction.Transactional;
 
@Service
@Transactional
public class ResolveService {
	
	@Autowired
	private ResolveRepository resolveRepository;

	public List<Resolve> showResolve(){
		return resolveRepository.findAll();
	}
	
	public Resolve searchResolveByTicketId(int ticketId) {
	    Resolve resolve = resolveRepository.findByTicketId(ticketId);
	    if (resolve == null) {
	        throw new RuntimeException("Resolve not found for ticket ID: " + ticketId);
	    }
	    return resolve;
	}

	
	public List<Resolve> searchResolveByEmployeeId(int employeeId) {
        return resolveRepository.findByEmployeeId(employeeId);
    }
	
	public void addResolve(Resolve resolve) {
	    if (!resolveRepository.existsByTicketId(resolve.getTicketId())) {
	        resolveRepository.save(resolve);
	    } else {
	        throw new RuntimeException("Resolve already exists for this Ticket ID");
	    }
	}
     // avg resolution of employee
	public Map<String, Object> getAverageResolutionTimeWithEmployeeInfo() {
        List<Object[]> result = resolveRepository.findAverageResolutionTimeWithEmployeeInfo();
        Map<String, Object> employeeAvgResolutionTime = new HashMap<>();

        for (Object[] obj : result) {
            Integer employeeId = (Integer) obj[0];
            String employeeFirstName = (String) obj[1];
            String employeeLastName = (String) obj[2];
            Double avgTime = (Double) obj[3];

            // Storing employee info along with average resolution time
            employeeAvgResolutionTime.put(employeeId + " - " + employeeFirstName + " " + employeeLastName, avgTime);
        }
        return employeeAvgResolutionTime;
    }
	
	
	public void updateResolve(Resolve resolve) {
		resolveRepository.save(resolve);
	}
	
	public void deleteResolveByTicketId(int ticketId) {
	    Resolve resolve = resolveRepository.findByTicketId(ticketId);
	    if (resolve != null) {
	        resolveRepository.delete(resolve);
	    }
	}


}