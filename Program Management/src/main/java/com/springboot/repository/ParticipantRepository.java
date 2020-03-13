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
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.springboot.model.Participants;
import com.springboot.model.Transaction;

@Repository
public class ParticipantRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(ParticipantRepository.class);

	@Autowired
	private DynamoDBMapper mapper;

	public void insertIntoParticipants(Participants participant) {
		System.out.println("1"+participant.getId());
		System.out.println("2"+participant.getParticipant());
		System.out.println("3"+participant.getUsername());
		mapper.save(participant);
	}
	
	public void insertIntoTransaction(Transaction transaction) {
		
		mapper.save(transaction);
	}

	

	public DynamoDBSaveExpression buildDynamoDBSaveExpression(Participants participant) {
		DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression();
		Map<String, ExpectedAttributeValue> expected = new HashMap<>();
		expected.put("Id", new ExpectedAttributeValue(new AttributeValue(participant.getId()))
				.withComparisonOperator(ComparisonOperator.EQ));
		saveExpression.setExpected(expected);
		return saveExpression;
	}
}