package com.springboot.model;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;


public class Blockchain implements Serializable {

	private static final long serialVersionUID = 1L;

	private String actionId;	
	private String actionOwner;	
	private String actionDate;	
	private String actionDone;
	private int hash;
	private int previousHash;
	
	public int getHash() {
		return hash;
	}
	public void setHash(int hash) {
		this.hash = hash;
	}
	public int getPreviousHash() {
		return previousHash;
	}
	public void setPreviousHash(int previousHash) {
		this.previousHash = previousHash;
	}
	public String getActionId() {
		return actionId;
	}
	public void setActionId(String actionId) {
		this.actionId = actionId;
	}
	public String getActionOwner() {
		return actionOwner;
	}
	public void setActionOwner(String actionOwner) {
		this.actionOwner = actionOwner;
	}
	public String getActionDate() {
		return actionDate;
	}
	public void setActionDate(String actionDate) {
		this.actionDate = actionDate;
	}
	public String getActionDone() {
		return actionDone;
	}
	public void setActionDone(String actionDone) {
		this.actionDone = actionDone;
	}
	

	
}
