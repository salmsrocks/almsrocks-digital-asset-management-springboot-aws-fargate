package com.springboot.repository;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.springboot.model.Program;
import com.springboot.model.Transaction;

@Repository
public class ProgramMgmtRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProgramMgmtRepository.class);

	@Autowired
	private DynamoDBMapper mapper;

	public void insertIntoProgram(Program program) {
		mapper.save(program);
	}
	
public void insertIntoTransaction(Transaction transaction) {
		
		mapper.save(transaction);
	}

	

	/*
	 * public Program getAllProgramDetails(String programOwner) { return
	 * mapper.load(Program.class, programOwner); }
	 */
	/*
	 * public void updateProgramDetails(Program program) { try {
	 * mapper.save(program, buildDynamoDBSaveExpression(program)); } catch
	 * (ConditionalCheckFailedException exception) { LOGGER.error("invalid data - "
	 * + exception.getMessage()); } }
	 */

	public void deleteProgramDetails(Program program) {
		
		System.out.println("hhhhhhhhh"+program.toString());
		mapper.delete(program);
	}

	/*
	 * public DynamoDBSaveExpression buildDynamoDBSaveExpression(Program program) {
	 * DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression();
	 * Map<String, ExpectedAttributeValue> expected = new HashMap<>();
	 * expected.put("programId", new ExpectedAttributeValue(new
	 * AttributeValue(program.getProgramId()))
	 * .withComparisonOperator(ComparisonOperator.EQ));
	 * saveExpression.setExpected(expected); return saveExpression; }
	 */
}