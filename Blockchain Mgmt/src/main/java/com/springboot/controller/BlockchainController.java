package com.springboot.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.springboot.model.Block;
import com.springboot.model.Blockchain;
import com.springboot.model.Transaction;
import com.springboot.repository.BlockchainRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BlockchainController {

	@Autowired
	private BlockchainRepository repository;
	
	@Value("${amazon.access.key}")
	private static String awsAccessKey;

	@Value("${amazon.access.secret-key}")
	private static String awsSecretKey;

	@Value("${amazon.region}")
	private static String awsRegion;

	@Value("${amazon.end-point.url}")
	private static String awsDynamoDBEndPoint;
	/*
	 * @PostMapping("/AddBlock") public String insertIntoBlockChain(@RequestBody
	 * Transaction blockchain) { repository.insertIntoBlockchain(blockchain); return
	 * "Successfully added the block"; }
	 */
	
	@GetMapping("/getBlocks")
	private static List<Blockchain> FindAllBlocks() throws Exception {

        System.out.println("Find all Blocks from  blockchain table.");
        
        Regions clientRegion = Regions.US_EAST_2;		
		
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();           

        DynamoDBMapper mapper = new DynamoDBMapper(client);
        List<Blockchain> blockobj = null;
         Blockchain blockchain;

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
     
        eav.put(":val1", new AttributeValue().withS("dummy"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
        		
            .withFilterExpression("actionOwner <> :val1").withExpressionAttributeValues(eav);

        PaginatedScanList<Transaction> scanResult = mapper.scan(Transaction.class, scanExpression);   
        
        int previoushash = 459987965;
        blockobj = new ArrayList<Blockchain>();  
        for(int i=0; i<=scanResult.size()-1; i++){        	
        	blockchain = new Blockchain();
        	blockchain.setActionId(scanResult.get(i).getActionId());
        	blockchain.setActionDate(scanResult.get(i).getActionDate());
        	blockchain.setActionOwner(scanResult.get(i).getActionOwner());
        	blockchain.setActionDone(scanResult.get(i).getActionDone());        	
        	Block currenthash = new Block(previoushash, Arrays.asList(scanResult.get(2)));
        	blockchain.setPreviousHash(previoushash);
        	blockchain.setHash(currenthash.hashCode());
        	blockobj.add(blockchain);
        	previoushash=currenthash.hashCode();
        }

       return blockobj;
    }
	
	
	
}