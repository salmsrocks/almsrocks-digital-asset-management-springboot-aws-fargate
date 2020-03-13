package com.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@SpringBootApplication
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE }, allowedHeaders = { "x-auth-token", "x-requested-with", "x-xsrf-token" }, maxAge = 3600) 
@ComponentScan("com.springboot") 
public class ContractManagementApp {

	public static void main(String[] args) {
		SpringApplication.run(ContractManagementApp.class, args);
	}
}