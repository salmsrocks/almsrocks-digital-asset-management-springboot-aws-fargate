package com.springboot.model;

import java.io.Serializable;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "rights")
public class AssignRights implements Serializable {

	private static final long serialVersionUID = 1L;
	
		
	private String deal;
	
	private String currentDealStatus;
	
	@DynamoDBHashKey(attributeName = "deal")
	@DynamoDBAutoGeneratedKey
	public String getDeal() {
		return deal;
	}
	public void setDeal(String deal) {
		this.deal = deal;
	}
	
	@DynamoDBAttribute
	public String getCurrentDealStatus() {
		return currentDealStatus;
	}
	public void setCurrentStatus(String currentDealStatus) {
		this.currentDealStatus = currentDealStatus;
	}
	
	//private String program;
	
	
	
	
	
	
	
	
	
		
	
	

	
	
	
}
