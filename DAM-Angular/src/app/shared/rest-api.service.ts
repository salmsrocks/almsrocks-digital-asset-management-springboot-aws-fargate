import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Contract, User, Transaction} from 'src/app/layout/dashboard/Contract';
import {Participant} from 'src/app/layout/dashboard/Participant';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { Program } from '../layout/dashboard/Program';
import { Program } from '../layout/programdashboard/Program';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://13.82.231.227:3000/api';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getHistorian(): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiURL + '/system/historian')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch contract list
  getContracts(): Observable<Contract> {
    return this.http.get<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/Deal')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch contract
  getContract(id): Observable<Contract> {
    return this.http.get<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/Deal/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create contract
  createContract(contracts): Observable<Contract> {  
  
   var test = JSON.stringify(contracts);
   alert(test)
    return this.http.post<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/Deal', JSON.stringify(contracts), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  getMediaPartcipants(): Observable<User> {
    return this.http.get<User>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/MediaParticipant')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getVendors(): Observable<User> {
    return this.http.get<User>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/Vendor')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAgency(): Observable<User> {
    return this.http.get<User>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/Agency')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPrograms(): Observable<Program> {
    return this.http.get<Program>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/Program')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  // HttpClient API post() method => Create Program
  createProgram(program): Observable<Program> {
    debugger;
  
    var test = JSON.stringify(program);
    console.log(test);
    return this.http.post<Program>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/Program', JSON.stringify(program), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  createParticipant(participant,mediaParticipantType ): Observable<Participant> {
    debugger;
    
    var test = JSON.stringify(participant);   
    return this.http.post<Participant>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/'+ mediaParticipantType, JSON.stringify(participant), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  deleteProgram(id)
  {
    return this.http.delete<Contract>('http://ec2co-ecsel-1gkzndg2t7rna-77197088.us-east-2.elb.amazonaws.com:9002/api' + '/Program/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete contract
  deleteContract(id)
  {
    return this.http.delete<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/Deal/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete contract
  updateContractStatus(contract)
  {
    debugger;
    var test = JSON.stringify(contract);
    alert(contract)
    return this.http.post<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/UpdateDealStatus', JSON.stringify(contract), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  AssignRights(contract)
  {
    debugger;
    var test = JSON.stringify(contract);
    return this.http.post<Contract>('http://ec2co-ecsel-1hrczzkq9r3k1-369262272.us-east-2.elb.amazonaws.com:9003/api' + '/AssignRights', JSON.stringify(contract), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent)
      {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}