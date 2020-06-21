package com.mc.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mc.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	
}
