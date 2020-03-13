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
import com.springboot.model.Transaction;

@Repository
public class BlockchainRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(BlockchainRepository.class);

	@Autowired
	private DynamoDBMapper mapper;

	public void insertIntoBlockchain(Transaction blockchain) {
		mapper.save(blockchain);
	}

	

	
}