package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {
	
	Optional<Faq> findById(Long faqId);

}
