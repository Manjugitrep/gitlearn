package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	
	Employee findByEmployeeFirstName(String employeeFirstName);
	
//	Employee findByEmployeeEmail(String employeeEmail);
	
	long countByEmployeeFirstNameAndEmployeePassword(String employeeFirstName, String employeePassword);
	
	Optional<Employee> findByEmployeeEmail(String username);
	
	Employee findByEmployeePhNo(String employeePhNo);
	
	List<Employee> findByEmployeeManagerId(int employeeManagerId);
	
	// Called in EmployeeRepository for filtering employees by their departments
	@Query("SELECT e.employeeId FROM Employee e WHERE e.employeeDept = :department")
	List<Integer> findEmployeeIdsByDepartment(@Param("department") String department);

	
	@Query("SELECT e.employeeId FROM Employee e WHERE e.employeeDept = ?1 ORDER BY e.employeeId ASC")
    List<Integer> findEmployeesByDomain(String domain);
}
