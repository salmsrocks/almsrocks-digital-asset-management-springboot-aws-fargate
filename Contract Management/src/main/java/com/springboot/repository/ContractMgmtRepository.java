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
import com.springboot.model.Contract;
import com.springboot.model.Transaction;
import com.springboot.model.AssignRights;

@Repository
public class ContractMgmtRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContractMgmtRepository.class);

	@Autowired
	private DynamoDBMapper mapper;

	public void insertIntoContractDB(Contract contract) {
		mapper.save(contract);
	}

	public Contract getOneContractDetails(String dealId) {
		return mapper.load(Contract.class, dealId);
	}

	public void updateContractDetails(Contract contract) {
		try {
			mapper.save(contract, buildDynamoDBSaveExpression(contract));
		} catch (ConditionalCheckFailedException exception) {
			LOGGER.error("invalid data - " + exception.getMessage());
		}
	}

	public void deleteContractDetails(Contract contract) {
		mapper.delete(contract);
	}
	
	public void insertIntoRightsDB(AssignRights rights) {
		mapper.save(rights);
	}

     public void insertIntoTransaction(Transaction transaction) {
		
		mapper.save(transaction);
	}
	public DynamoDBSaveExpression buildDynamoDBSaveExpression(Contract contract) {
		DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression();
		Map<String, ExpectedAttributeValue> expected = new HashMap<>();
		expected.put("dealId", new ExpectedAttributeValue(new AttributeValue(contract.getDealId()))
				.withComparisonOperator(ComparisonOperator.EQ));
		saveExpression.setExpected(expected);
		return saveExpression;
	}
}