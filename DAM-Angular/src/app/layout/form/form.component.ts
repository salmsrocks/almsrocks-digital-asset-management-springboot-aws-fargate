import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RestApiService } from "src/app/shared/rest-api.service";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    user:string;
    role:string;
    MediaParticipants:any=[];
    Vendors:any=[];
    Agency:any=[];
    vendorcontract:any=[];
    agencycontract:any=[];
    Programs: any = [];Contracts:any=[]; 
    Contractcreatedcount=0;Contractpaymentcompleted=0;Contractexecuted=0;
    constructor( public restApi: RestApiService) {}

    ngOnInit() {
        this.role=sessionStorage.getItem('Loggedinrole');
  this.user=sessionStorage.getItem('isLoggedin');
  this.getMediaParticipants();
 this.getVendors();
 this.getAgencies(); 
        this.loadPrograms();
        this.loadContracts();
    }

    getMediaParticipants(){
        this.MediaParticipants=[]; 
        return this.restApi.getMediaPartcipants().subscribe((data: {}) => {         
           this.MediaParticipants=data;
         });
       }
      
       getVendors(){
        this.Vendors=[];
        return this.restApi.getVendors().subscribe((data: {}) => {         
           this.Vendors=data;
         });
       }
      
       getAgencies(){
        this.Agency=[];
        return this.restApi.getAgency().subscribe((data: {}) => {        
           this.Agency=data;
         })
       }

    loadPrograms() 
 {
  return this.restApi.getPrograms().subscribe((data: {}) => {
    this.Programs = data;
  })
 }
 
 loadContracts() 
 {  
    return this.restApi.getContracts().subscribe((data: {}) => {   
    this.Contracts = data; 
    this.Contracts.forEach(element => {
        this.Vendors.forEach(p=>{
          debugger;
          if(p.Id==element.vendor.replace("resource:univisiontmt.Vendor#","")){
            element.vendor= p.username;          
          }
         // else if(p.mediaParticipantId==element.agency.replace("resource:univisiontmt.MediaParticipant#","")){
           
          //}
        }) 
  
        this.Agency.forEach(p=>{
          debugger;
          if(p.Id==element.agency.replace("resource:univisiontmt.Agency#","")){
          element.agency= p.username;  
          }
        });
        element.dealFromDate = new Date( element.dealFromDate).toLocaleDateString().split('T')[0];
        element.dealToDate = new Date(element.dealToDate).toLocaleDateString().split('T')[0];
        element.createdDate = new Date( element.createdDate).toLocaleDateString().split('T')[0];
      });
      debugger;
      if(this.role=='vendor'){
        this.vendorcontract=[];
      this.Contracts.forEach(con=>{
        if(con.vendor.toLowerCase()==this.user.toLowerCase()){
  this.vendorcontract.push(con);
        }
      });
      this.Contracts=this.vendorcontract;
    }
      if(this.role=='agency'){
        this.agencycontract=[];
        this.Contracts.forEach(con=>{
          if(con.agency.toLowerCase()==this.user.toLowerCase()){
    this.agencycontract.push(con);
          }
        });
        this.Contracts=this.agencycontract;
      }
    this.Contracts.forEach(element => {
        if(element.dealStatus=='Approved'){
            this.Contractcreatedcount++;
        }
        if(element.dealStatus=='Contract Executed'){
            this.Contractexecuted++;
        }
        if(element.dealStatus=='Payment completed'){
            this.Contractpaymentcompleted++;
        }
    }); 
    });
}
}
