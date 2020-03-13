package com.springboot.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
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
import com.springboot.model.Participants;
import com.springboot.model.Transaction;
import com.springboot.repository.ParticipantRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ParticipantController {
	
	@Value("${amazon.access.key}")
	private static String awsAccessKey;

	@Value("${amazon.access.secret-key}")
	private static String awsSecretKey;

	@Value("${amazon.region}")
	private static String awsRegion;

	@Value("${amazon.end-point.url}")
	private static String awsDynamoDBEndPoint;

	@Autowired
	private ParticipantRepository repository;

	@PostMapping("/MediaParticipant")
	public String insertAsMediaParticipants(@RequestBody Participants participant) {
		String timeStamp="";
		if(participant.getId()!=null) {			
			participant.setId(participant.getId());
		}
		else {
			timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());			
			String randomval = "p"+timeStamp;		
			participant.setId(randomval);
		}
		participant.setParticipant("MediaParticipant");
		participant.setUsername(participant.getUsername());
		repository.insertIntoParticipants(participant);	
		Transaction transaction = new Transaction();		
		transaction.setActionId("P"+timeStamp);
		String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
		transaction.setActionDate(date);
		transaction.setActionDone("Added MediaParticipant "+participant.getUsername());
		transaction.setActionOwner("univision");
		repository.insertIntoTransaction(transaction);
	
		return " \" Successfully added the participants \" ";
		//return "Successfully added the participants";
	}
	@PostMapping("/Vendor")
	public String insertAsVendors(@RequestBody Participants participant) {
		String timeStamp="";
		if(participant.getId()!=null) {			
			participant.setId(participant.getId());
		}
		else {
			timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
			
			String randomval = "p"+timeStamp;
			
			participant.setId(randomval);
		}
		participant.setParticipant("Vendor");
		participant.setUsername(participant.getUsername());
		repository.insertIntoParticipants(participant);
		Transaction transaction = new Transaction();
		transaction.setActionId("P"+timeStamp);
		String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
		transaction.setActionDate(date);
		transaction.setActionDone("Added Vendor "+participant.getUsername());
		transaction.setActionOwner("univision");
		repository.insertIntoTransaction(transaction);
		return " \" Successfully added the participants \" ";
	}
	@PostMapping("/Agency")
	public String insertAsAgency(@RequestBody Participants participant) {
		String timeStamp="";
		if(participant.getId()!=null) {			
			participant.setId(participant.getId());
		}
		else {
			timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());			
			String randomval = "p"+timeStamp;		
			participant.setId(randomval);
		}
		participant.setParticipant("Agency");
		participant.setUsername(participant.getUsername());
		repository.insertIntoParticipants(participant);
		Transaction transaction = new Transaction();
		transaction.setActionId("P"+timeStamp);
		String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
		transaction.setActionDate(date);
		transaction.setActionDone("Added Vendor "+participant.getUsername());
		transaction.setActionOwner("univision");
		repository.insertIntoTransaction(transaction);
		return " \" Successfully added the participants \" ";
	}
	
	@GetMapping("/MediaParticipant")
	private static PaginatedScanList<Participants> FindAllMediaParticipants() throws Exception {

        System.out.println("Find all MediaParticipants from  participants table.");
        
        Regions clientRegion = Regions.US_EAST_2;		
		
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();         

        DynamoDBMapper mapper = new DynamoDBMapper(client);

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
     
        eav.put(":val1", new AttributeValue().withS("MediaParticipant"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
        		
            .withFilterExpression("participant = :val1").withExpressionAttributeValues(eav);

        PaginatedScanList<Participants> scanResult = mapper.scan(Participants.class, scanExpression);

       return scanResult;
    }
	
	@GetMapping("/Vendor")
	private static PaginatedScanList<Participants> FindAllVendors() throws Exception {

        System.out.println("Find all Vendors from  participants table.");
        
        Regions clientRegion = Regions.US_EAST_2;		
		
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();        

        DynamoDBMapper mapper = new DynamoDBMapper(client);

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
     
        eav.put(":val1", new AttributeValue().withS("Vendor"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
        		
            .withFilterExpression("participant = :val1").withExpressionAttributeValues(eav);

        PaginatedScanList<Participants> scanResult = mapper.scan(Participants.class, scanExpression);

       return scanResult;
    }
	
	@GetMapping("/Agency")
	private static PaginatedScanList<Participants> FindAllAgency() throws Exception {

        System.out.println("Find all Agency from  participants table.");
        
        Regions clientRegion = Regions.US_EAST_2;		
		
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();            

        DynamoDBMapper mapper = new DynamoDBMapper(client);

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
     
        eav.put(":val1", new AttributeValue().withS("Agency"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
        		
            .withFilterExpression("participant = :val1").withExpressionAttributeValues(eav);      

        PaginatedScanList<Participants> scanResult = mapper.scan(Participants.class, scanExpression);        
        
       return scanResult;
    }
	
}