package com.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

/*import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
*/
@SpringBootApplication
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE }, allowedHeaders = { "x-auth-token", "x-requested-with", "x-xsrf-token" }, maxAge = 3600) 
@ComponentScan("com.springboot") 
public class BlockChainMgmt{

	
	/*
	 * @Override protected SpringApplicationBuilder
	 * configure(SpringApplicationBuilder builder) { return
	 * builder.sources(ParticipantMgmt.class); }
	 */
	public static void main(String[] args) {
		SpringApplication.run(BlockChainMgmt.class, args);
	}
	
}