package com.springboot.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.model.AssignRights;
import com.springboot.model.Contract;
import com.springboot.model.Transaction;
import com.springboot.repository.ContractMgmtRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ContractMgmtController {

	@Autowired
	private ContractMgmtRepository repository;
	
	@Value("${amazon.access.key}")
	private static String awsAccessKey;

	@Value("${amazon.access.secret-key}")
	private static String awsSecretKey;

	@Value("${amazon.region}")
	private static String awsRegion;

	@Value("${amazon.end-point.url}")
	private static String awsDynamoDBEndPoint;


	@PostMapping("/Deal")
	public String insertIntoContractDB(@RequestBody Contract contract) throws JsonProcessingException {
		
		String vendor = contract.getVendor();
		String agency = contract.getAgency();
		
		contract.setAgency(agency);
		contract.setVendor(vendor);
		if(contract.getDealId()!=null) {			
			contract.setDealId(contract.getDealId());
		}
		else {
			String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());			
			String randomval = "c"+timeStamp;		
			contract.setDealId(randomval);
		}		
		
		repository.insertIntoContractDB(contract);
		Transaction transaction = new Transaction();
		String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
		transaction.setActionId("P"+timeStamp);
		String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
		transaction.setActionDate(date);
		transaction.setActionDone("Created Deal with vendor "+ contract.getVendor());
		transaction.setActionOwner("univision");
		repository.insertIntoTransaction(transaction);
		
		return " \" Successfully inserted into contract table \" ";
	}

	@GetMapping("Deal/{dealId}")
	public ResponseEntity<Contract> getOneContractDetails(@PathVariable("dealId") String dealId) {
		Contract contract = repository.getOneContractDetails(dealId);
		return new ResponseEntity<Contract>(contract, HttpStatus.OK);
	}
	
	

	@GetMapping("/Deal")
	private static PaginatedScanList<Contract> FindAllContracts() throws Exception {

		System.out.println("Find all contract from  contract table.");

		Regions clientRegion = Regions.US_EAST_2;

		BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();

		DynamoDBMapper mapper = new DynamoDBMapper(client);

		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();

		eav.put(":val1", new AttributeValue().withS("dummy"));

		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()

				.withFilterExpression("dealId <> :val1").withExpressionAttributeValues(eav);

		PaginatedScanList<Contract> scanResult = mapper.scan(Contract.class, scanExpression);

		return scanResult;
	}
	
	@PostMapping("/UpdateDealStatus")
	public String UpdateIntoContractDB(@RequestBody Contract contract) throws JsonProcessingException {
		ObjectMapper mapper1 = new ObjectMapper();
		String jsonString1 = mapper1.writeValueAsString(contract);
		
		String dealId=contract.getDealId();
		String status=contract.getDealStatus();
		
		Contract contract1 = repository.getOneContractDetails(dealId);		
		String vendor = contract1.getVendor();
		String agency = contract1.getAgency();
		contract1.setAgency(agency);
		contract1.setVendor(vendor);
		contract1.setCreatedDate(contract1.getCreatedDate());
		contract1.setDealCurrency(contract1.getDealCurrency());
		contract1.setDealFromDate(contract1.getDealFromDate());
		contract1.setDealId(contract1.getDealId());
		contract1.setDealName(contract1.getDealName());
		contract1.setDealStatus(status);
		contract1.setDealToDate(contract1.getDealToDate());
		contract1.setDealType(contract1.getDealType());
		
		ObjectMapper mapper = new ObjectMapper();
		
		repository.insertIntoContractDB(contract1);
		return " \" Successfully updated into contract table \" ";
		
	}

	/*
	 * @PostMapping("/UpdateDealStatus") public String
	 * updateContractStatus(@RequestBody Contract contract) {
	 * System.out.println("HHHHHHHHHHHHHHHH" + contract.toString());
	 * repository.updateContractDetails(contract); return "contract status updated";
	 * }
	 */
	
	  @DeleteMapping(value = "Deal/{dealId}") public String
	  deleteContractDetails(@PathVariable("dealId") String dealId) {
		  Contract  contract = new Contract(); 
		  contract.setDealId(dealId);	  
	  repository.deleteContractDetails(contract);
	  return " \" Successfully deleted from contract table \" ";
	  }
	  
	  @PostMapping("/AssignRights")
		public String insertIntoRightsDB(@RequestBody AssignRights rights){				
			repository.insertIntoRightsDB(rights);
			Transaction transaction = new Transaction();
			String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
			transaction.setActionId("P"+timeStamp);
			String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
			transaction.setActionDate(date);
			transaction.setActionDone("Deal id "+rights.getDeal()+ "executed");
			transaction.setActionOwner("univision");
			repository.insertIntoTransaction(transaction);
			return " \" Successfully inserted into rights table \" ";			
	 }
	 
}