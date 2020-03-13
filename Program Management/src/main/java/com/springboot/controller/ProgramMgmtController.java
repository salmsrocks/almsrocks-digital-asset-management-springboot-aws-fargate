package com.springboot.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.springboot.model.Program;
import com.springboot.model.Transaction;
import com.springboot.repository.ProgramMgmtRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProgramMgmtController {
	
	@Value("${amazon.access.key}")
	private static String awsAccessKey;

	@Value("${amazon.access.secret-key}")
	private static String awsSecretKey;

	@Value("${amazon.region}")
	private static String awsRegion;

	@Value("${amazon.end-point.url}")
	private static String awsDynamoDBEndPoint;

	@Autowired
	private ProgramMgmtRepository repository;

	@PostMapping("/Program")
	public String insertIntoProgram(@RequestBody Program program) {
		repository.insertIntoProgram(program);
		Transaction transaction = new Transaction();
		String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
		transaction.setActionId("P"+timeStamp);
		String date = new SimpleDateFormat("yyyy/MM/dd").format(Calendar.getInstance().getTime());		
		transaction.setActionDate(date);
		transaction.setActionDone("Added Program "+program.getProgramName());
		transaction.setActionOwner("univision");
		repository.insertIntoTransaction(transaction);
		return " \" Successfully inserted into program table \" ";
	
	}

	
	
	@GetMapping("/Program")
	private static PaginatedScanList<Program> FindAllPrograms() throws Exception {

        System.out.println("Find all programs from  program table.");
        
        Regions clientRegion = Regions.US_EAST_2;		
        //AmazonDynamoDBClient ddbClient = new AmazonDynamoDBClient(credentialsProvider);
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();            

        DynamoDBMapper mapper = new DynamoDBMapper(client);

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        
     
       eav.put(":val1", new AttributeValue().withS("dummy"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
        		
            .withFilterExpression("programId <> :val1").withExpressionAttributeValues(eav);

        PaginatedScanList<Program> scanResult = mapper.scan(Program.class, scanExpression);

       return scanResult;
    }
	/*
	 * public ResponseEntity<Program> getAllProgramDetails(@RequestParam String
	 * programOwner) { Program program =
	 * repository.getAllProgramDetails(programOwner); return new
	 * ResponseEntity<Program>(program, HttpStatus.OK); }
	 */

	/*
	 * @PutMapping public void updateProgramDetails(@RequestBody Program program) {
	 * repository.updateProgramDetails(program); }
	 */

	@DeleteMapping(path = "Program/{programid}")
	public String deleteProgramDetails(@PathVariable("programid") String programid) {
		Program pgm = new Program();
		pgm.setProgramId(programid);		
		repository.deleteProgramDetails(pgm);
		
		return " \" Successfully deleted from program table \" ";
		
	}
}