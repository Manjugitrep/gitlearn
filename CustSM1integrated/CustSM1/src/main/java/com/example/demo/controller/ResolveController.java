package com.example.demo.controller;
 
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Resolve;
import com.example.demo.service.ResolveService;
 
@RestController
@RequestMapping(value="/resolve")
public class ResolveController {
	
	@Autowired
	private ResolveService resolveService;

	@GetMapping(value="/showResolve")
	public List<Resolve> showResolve() {
		return resolveService.showResolve();
	}
	
	@GetMapping(value="/searchResolveByTicketId/{ticketId}")
	public ResponseEntity<Resolve> searchResolveByTicketId(@PathVariable int ticketId){
	    Resolve resolve = resolveService.searchResolveByTicketId(ticketId);
	    if (resolve != null) {
	        return new ResponseEntity<>(resolve, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	
	@GetMapping(value="/searchResolveByEmployeeId/{employeeId}")
	public ResponseEntity<List<Resolve>> searchResolveByEmpId(@PathVariable int employeeId){
	    List<Resolve> resolveList = resolveService.searchResolveByEmployeeId(employeeId);
	    if(resolveList.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	    return new ResponseEntity<>(resolveList, HttpStatus.OK);
	}
	
	@PostMapping(value="/addResolve")
	public void addEmploy(@RequestBody Resolve resolve) {
		resolveService.addResolve(resolve);
	}
	
	@PutMapping(value="/updateResolve")
	public void updateResolve(@RequestBody Resolve resolve) {
		resolveService.updateResolve(resolve);
	}
	
	@GetMapping("/averageresolutiontime")
    public Map<String, Object> getAverageResolutionTimeWithEmployeeInfo() {
        return resolveService.getAverageResolutionTimeWithEmployeeInfo();
    }
	
	@DeleteMapping(value="/deleteResolve/{ticketId}")
	public void deleteResolve (@PathVariable int ticketId) {
	    resolveService.deleteResolveByTicketId(ticketId);
	}

}